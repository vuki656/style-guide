export default {
    git: {
        commitMessage: "chore(release): ${version} [skip-ci]",
        tagName: "v${version}",
        requireCleanWorkingDir: true,
        requireBranch: "master",
    },
    github: {
        release: true,
        releaseName: "v${version}",
    },
    npm: {
        publish: true,
        skipChecks: true,
    },
    plugins: {
        "@release-it/conventional-changelog": {
            infile: "CHANGELOG.md",
            header: "# Changelog\n\nAll notable changes to this project will be documented in this file.\n",
            preset: {
                name: "conventionalcommits",
                types: [
                    { type: "feat", section: "Features" },
                    { type: "fix", section: "Bug Fixes" },
                    { type: "refactor", section: "Code Refactoring" },
                    { type: "perf", section: "Performance Improvements" },
                    { type: "docs", section: "Documentation", hidden: true },
                    { type: "style", section: "Styles", hidden: true },
                    { type: "test", section: "Tests", hidden: true },
                    { type: "build", section: "Build System", hidden: true },
                    { type: "ci", section: "CI/CD", hidden: true },
                    { type: "chore", section: "Chores", hidden: true },
                ],
            },
            whatBump: (commits) => {
                let level = 2
                let breakings = 0
                let features = 0

                for (const commit of commits) {
                    if (commit.notes && commit.notes.length > 0) {
                        const hasBreaking = commit.notes.some(
                            (note) =>
                                note.title === "BREAKING CHANGE" || note.title === "BREAKING-CHANGE"
                        )

                        if (hasBreaking) {
                            breakings += 1
                            level = 0
                        }
                    }

                    if (commit.type === "feat" || commit.type === "refactor") {
                        features += 1

                        if (level === 2) {
                            level = 1
                        }
                    }
                }

                if (level === 0) {
                    return {
                        level: 0,
                        reason: `There are ${breakings} BREAKING CHANGES`,
                    }
                }

                if (level === 1) {
                    return {
                        level: 1,
                        reason: `There are ${features} features or refactors`,
                    }
                }

                return {
                    level: 2,
                    reason: "There are only fixes or other minor changes",
                }
            },
        },
    },
}
