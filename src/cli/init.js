import { execSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { writeFile } from "node:fs/promises"

import * as clack from "@clack/prompts"

import { generateCspellConfig } from "./generators/cspell.js"
import { generateESLintConfig } from "./generators/eslint.js"
import { generateKnipConfig } from "./generators/knip.js"
import { generatePrettierConfig } from "./generators/prettier.js"
import { generateScripts } from "./generators/scripts.js"
import { generateStylelintConfig } from "./generators/stylelint.js"
import {
    promptAddScripts,
    promptESLintOptions,
    promptInstall,
    promptOverwrite,
    promptToolSelection,
} from "./prompts.js"

const TOOL_PACKAGES = {
    cspell: "cspell",
    eslint: "eslint",
    knip: "knip",
    prettier: "prettier",
    stylelint: "stylelint",
}

function detectPackageManager() {
    if (existsSync("pnpm-lock.yaml")) {
        return "pnpm"
    }

    if (existsSync("yarn.lock")) {
        return "yarn"
    }

    if (existsSync("bun.lockb")) {
        return "bun"
    }

    return "npm"
}

function getInstalledPackages() {
    try {
        const packageJson = JSON.parse(readFileSync("package.json", "utf8"))

        return {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
        }
    } catch {
        return {}
    }
}

function getMissingPackages(tools) {
    const installed = getInstalledPackages()
    const missing = []

    if (!("@dvukovic/style-guide" in installed)) {
        missing.push("@dvukovic/style-guide")
    }

    for (const tool of tools) {
        const packageName = TOOL_PACKAGES[tool]

        if (packageName && !(packageName in installed)) {
            missing.push(packageName)
        }
    }

    return missing
}

async function installPackages(tools, packageManager) {
    const missingPackages = getMissingPackages(tools)

    if (missingPackages.length === 0) {
        return
    }

    const shouldInstall = await promptInstall(packageManager, missingPackages)

    if (!shouldInstall) {
        return
    }

    const packages = missingPackages.join(" ")
    const installCmd =
        packageManager === "npm"
            ? `npm install -D ${packages}`
            : `${packageManager} add -D ${packages}`

    const spinner = clack.spinner()

    spinner.start("Installing packages")

    try {
        // eslint-disable-next-line sonarjs/os-command -- User-confirmed install command
        execSync(installCmd, { stdio: "pipe" })
        spinner.stop("Packages installed")
    } catch {
        spinner.stop("Failed to install. Please run manually:")
        clack.log.info(`  ${installCmd}`)
    }
}

async function writeConfigFile(filename, content) {
    if (existsSync(filename)) {
        const overwrite = await promptOverwrite(filename)

        if (!overwrite) {
            clack.log.info(`Skipped ${filename}`)

            return false
        }
    }

    await writeFile(filename, content)
    clack.log.success(`Created ${filename}`)

    return true
}

async function updatePackageJsonScripts(tools, packageManager) {
    const scripts = generateScripts(tools, packageManager)

    if (Object.keys(scripts).length === 0) {
        return
    }

    try {
        const packageJsonContent = readFileSync("package.json", "utf8")
        const packageJson = JSON.parse(packageJsonContent)

        packageJson.scripts = {
            ...packageJson.scripts,
            ...scripts,
        }

        const sortedKeys = Object.keys(packageJson.scripts).sort((left, right) => {
            return left.localeCompare(right)
        })
        const sortedScripts = {}

        for (const key of sortedKeys) {
            sortedScripts[key] = packageJson.scripts[key]
        }

        packageJson.scripts = sortedScripts

        await writeFile("package.json", `${JSON.stringify(packageJson, null, 4)}\n`)
        clack.log.success("Added scripts to package.json")
    } catch {
        clack.log.error("Failed to update package.json scripts")
    }
}

export async function runInit() {
    const tools = await promptToolSelection()

    let eslintOptions = null

    if (tools.includes("eslint")) {
        eslintOptions = await promptESLintOptions()
    }

    const shouldAddScripts = await promptAddScripts()
    const packageManager = detectPackageManager()

    await installPackages(tools, packageManager)

    const spinner = clack.spinner()

    spinner.start("Generating configuration files")

    const results = []

    if (tools.includes("eslint") && eslintOptions) {
        const content = generateESLintConfig(eslintOptions)

        results.push({ content, filename: "eslint.config.js" })
    }

    if (tools.includes("prettier")) {
        const content = generatePrettierConfig()

        results.push({ content, filename: "prettier.config.ts" })
    }

    if (tools.includes("stylelint")) {
        const content = generateStylelintConfig()

        results.push({ content, filename: "stylelint.config.js" })
    }

    if (tools.includes("cspell")) {
        const content = generateCspellConfig()

        results.push({ content, filename: "cspell.config.js" })
    }

    if (tools.includes("knip")) {
        const content = generateKnipConfig()

        results.push({ content, filename: "knip.config.ts" })
    }

    spinner.stop("Configuration files generated")

    for (const { content, filename } of results) {
        // eslint-disable-next-line no-await-in-loop -- Sequential writes for user feedback
        await writeConfigFile(filename, content)
    }

    if (shouldAddScripts) {
        await updatePackageJsonScripts(tools, packageManager)
    }
}
