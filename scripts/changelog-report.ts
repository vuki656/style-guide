/* eslint-disable
    no-console,
    security-node/detect-crlf,
    security-node/detect-unhandled-async-errors,
-- CLI script */

import { exec } from "node:child_process"
import { writeFile } from "node:fs/promises"
import { promisify } from "node:util"

import * as semver from "semver"

import type {
    GitHubReleaseType,
    NpmOutdatedOutputType,
    NpmRegistryResponseType,
    OutdatedPackageType,
    PackageChangelogType,
} from "./changelog-report.types"

const execAsync = promisify(exec)

async function getOutdatedPackages(): Promise<OutdatedPackageType[]> {
    try {
        const { stdout } = await execAsync("npm outdated --json", {
            maxBuffer: 10 * 1024 * 1024,
        })

        if (!stdout.trim() || stdout.trim() === "{}") {
            return []
        }

        const outdated = JSON.parse(stdout) as NpmOutdatedOutputType

        return Object.entries(outdated)
            .filter(([, info]) => {
                return info.current !== info.latest
            })
            .map(([name, info]) => {
                return {
                    current: info.current,
                    latest: info.latest,
                    name,
                }
            })
    } catch (error) {
        if (error instanceof Error && "stdout" in error) {
            const stdout = (error as { stdout: string }).stdout

            if (!stdout.trim() || stdout.trim() === "{}") {
                return []
            }

            const outdated = JSON.parse(stdout) as NpmOutdatedOutputType

            return Object.entries(outdated)
                .filter(([, info]) => {
                    return info.current !== info.latest
                })
                .map(([name, info]) => {
                    return {
                        current: info.current,
                        latest: info.latest,
                        name,
                    }
                })
        }

        console.error("Error running npm outdated:", error)

        return []
    }
}

async function getGitHubRepoFromNpm(packageName: string): Promise<string | null> {
    try {
        const response = await fetch(`https://registry.npmjs.org/${packageName}`)

        if (!response.ok) {
            return null
        }

        const data = (await response.json()) as NpmRegistryResponseType
        const repoUrl = data.repository?.url

        if (!repoUrl) {
            return null
        }

        const match = /github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?$/i.exec(repoUrl)

        if (match?.[1]) {
            return match[1]
        }

        return null
    } catch {
        return null
    }
}

async function fetchGitHubReleases(repo: string): Promise<GitHubReleaseType[]> {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                "User-Agent": "changelog-report-script",
            },
        })

        if (!response.ok) {
            return []
        }

        return (await response.json()) as GitHubReleaseType[]
    } catch {
        return []
    }
}

async function tryFetchUrl(url: string): Promise<string | null> {
    try {
        const response = await fetch(url, {
            headers: { "User-Agent": "changelog-report-script" },
        })

        return response.ok ? await response.text() : null
    } catch {
        return null
    }
}

async function fetchChangelogFile(repo: string): Promise<string | null> {
    const branches = ["main", "master"]
    const files = ["CHANGELOG.md", "HISTORY.md", "CHANGES.md", "changelog.md"]

    for (const branch of branches) {
        for (const file of files) {
            const url = `https://raw.githubusercontent.com/${repo}/${branch}/${file}`
            // eslint-disable-next-line no-await-in-loop -- sequential fallback attempts
            const content = await tryFetchUrl(url)

            if (content) {
                return content
            }
        }
    }

    return null
}

function extractVersionFromTag(tag: string): string | null {
    const match = /v?(\d+\.\d+\.\d+(?:-[\d.A-Za-z]+)?)/.exec(tag)

    return match?.[1] ?? null
}

function filterReleasesByVersion(
    releases: GitHubReleaseType[],
    currentVersion: string,
    latestVersion: string,
): GitHubReleaseType[] {
    return releases.filter((release) => {
        const version = extractVersionFromTag(release.tag_name)

        if (!version) {
            return false
        }

        try {
            return semver.gt(version, currentVersion) && semver.lte(version, latestVersion)
        } catch {
            return false
        }
    })
}

function isVersionInRange(version: string, currentVersion: string, latestVersion: string): boolean {
    try {
        return semver.gt(version, currentVersion) && semver.lte(version, latestVersion)
    } catch {
        return false
    }
}

function extractChangelogSection(
    changelog: string,
    currentVersion: string,
    latestVersion: string,
): string | null {
    const lines = changelog.split("\n")
    const sections: string[] = []
    let capturing = false
    let currentSection: string[] = []
    let currentSectionVersion: string | null = null

    for (const line of lines) {
        const versionMatch = /^#{1,3}\s*\[?v?(\d+\.\d+\.\d+(?:-[\d.A-Za-z]+)?)]?/.exec(line)

        if (versionMatch) {
            if (capturing && currentSection.length > 0 && currentSectionVersion) {
                sections.push(currentSection.join("\n"))
            }

            const version = versionMatch[1]
            const inRange = version && isVersionInRange(version, currentVersion, latestVersion)

            if (inRange) {
                capturing = true
                currentSection = [line]
                currentSectionVersion = version
            } else {
                capturing = false
                currentSection = []
                currentSectionVersion = null
            }
        } else if (capturing) {
            currentSection.push(line)
        }
    }

    if (capturing && currentSection.length > 0) {
        sections.push(currentSection.join("\n"))
    }

    return sections.length > 0 ? sections.join("\n\n") : null
}

async function getPackageChangelog(
    packageInfo: OutdatedPackageType,
): Promise<PackageChangelogType> {
    const result: PackageChangelogType = {
        changelog: "",
        current: packageInfo.current,
        latest: packageInfo.latest,
        name: packageInfo.name,
    }

    const repo = await getGitHubRepoFromNpm(packageInfo.name)

    if (!repo) {
        result.changelog = "*Could not find GitHub repository*"

        return result
    }

    const releases = await fetchGitHubReleases(repo)
    const filteredReleases = filterReleasesByVersion(
        releases,
        packageInfo.current,
        packageInfo.latest,
    )

    if (filteredReleases.length > 0) {
        const sortedReleases = [...filteredReleases].sort(
            (first: GitHubReleaseType, second: GitHubReleaseType) => {
                const versionA = extractVersionFromTag(first.tag_name) ?? "0.0.0"
                const versionB = extractVersionFromTag(second.tag_name) ?? "0.0.0"

                try {
                    return semver.rcompare(versionA, versionB)
                } catch {
                    return 0
                }
            },
        )

        const changelogParts = sortedReleases.map((release: GitHubReleaseType) => {
            const version = extractVersionFromTag(release.tag_name) ?? release.tag_name
            const body = release.body.trim() || "*No release notes*"

            return `### v${version}\n\n${body}`
        })

        result.changelog = changelogParts.join("\n\n")

        return result
    }

    const changelogFile = await fetchChangelogFile(repo)

    if (changelogFile) {
        const section = extractChangelogSection(
            changelogFile,
            packageInfo.current,
            packageInfo.latest,
        )

        if (section) {
            result.changelog = section

            return result
        }
    }

    result.changelog = `*No changelog found. Check: https://github.com/${repo}/compare/v${packageInfo.current}...HEAD*`

    return result
}

function generateReport(changelogs: PackageChangelogType[]): string {
    const date = new Date().toISOString().split("T")[0] ?? "unknown"
    const lines: string[] = [
        `# Package Updates - ${date}`,
        "",
        "> Generated by `yarn changelog-report`",
        "",
    ]

    for (const packageInfo of changelogs) {
        lines.push(
            `## ${packageInfo.name} (${packageInfo.current} → ${packageInfo.latest})`,
            "",
            packageInfo.changelog,
            "",
            "---",
            "",
        )
    }

    return lines.join("\n")
}

async function main(): Promise<void> {
    console.log("Checking for outdated packages...")

    const packages = await getOutdatedPackages()

    if (packages.length === 0) {
        console.log("All packages are up to date!")

        return
    }

    console.log(`Found ${String(packages.length)} outdated package(s)`)
    console.log("")

    const changelogs: PackageChangelogType[] = []

    for (const packageInfo of packages) {
        console.log(
            `Fetching changelog for ${packageInfo.name} (${packageInfo.current} → ${packageInfo.latest})...`,
        )

        // eslint-disable-next-line no-await-in-loop -- sequential to avoid rate limiting
        const changelog = await getPackageChangelog(packageInfo)

        changelogs.push(changelog)
    }

    console.log("")
    console.log("Generating report...")

    const report = generateReport(changelogs)

    await writeFile("PACKAGE_UPDATES.md", report)

    console.log("Report saved to PACKAGE_UPDATES.md")
}

// eslint-disable-next-line unicorn/prefer-top-level-await -- entry point
main().catch((error: unknown) => {
    console.error("Error:", error)
    // eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit -- CLI exit
    process.exit(1)
})
