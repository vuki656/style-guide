import { ESLint } from "eslint"
import { defineConfig } from "eslint/config"

import { packageJsonConfigs, packageJsonWorkspace } from "./package-json.js"

const eslint = new ESLint({
    overrideConfig: [...packageJsonConfigs, { files: ["**/package.json"] }],
    overrideConfigFile: true,
})

describe("package-json", () => {
    test("loads without errors", async () => {
        const validPackageJson = JSON.stringify(
            {
                author: "Test Author",
                description: "A test package",
                engines: {
                    node: ">=20.0.0",
                },
                license: "MIT",
                name: "test-package",
                repository: {
                    type: "git",
                    url: "https://github.com/test/test",
                },
                version: "1.0.0",
            },
            null,
            4,
        )

        const results = await eslint.lintText(validPackageJson, { filePath: "package.json" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })

    test("detects missing required fields", async () => {
        const invalidPackageJson = JSON.stringify(
            {
                name: "test-package",
            },
            null,
            4,
        )

        const results = await eslint.lintText(invalidPackageJson, { filePath: "package.json" })

        expect(results[0]?.errorCount).toBeGreaterThan(0)
    })
})

describe("packageJsonWorkspace", () => {
    test("returns array of two configs", () => {
        const configs = packageJsonWorkspace()

        expect(configs).toHaveLength(2)
    })

    test("root config targets package.json", () => {
        const configs = packageJsonWorkspace()

        expect(configs[0].files).toEqual(["package.json"])
    })

    test("nested config targets default workspace patterns", () => {
        const configs = packageJsonWorkspace()

        expect(configs[1].files).toEqual(["**/packages/**/package.json", "**/apps/**/package.json"])
    })

    test("nested config disables require-properties rule", () => {
        const configs = packageJsonWorkspace()

        expect(configs[1].rules).toEqual({
            "dvukovic/require-properties": "off",
        })
    })

    test("accepts custom workspace patterns", () => {
        const configs = packageJsonWorkspace({
            workspacePatterns: ["**/libs/**/package.json"],
        })

        expect(configs[1].files).toEqual(["**/libs/**/package.json"])
    })

    test("passes through extends to root config", () => {
        const customExtends = [{ rules: { "custom/rule": "error" } }]
        const configs = packageJsonWorkspace({ extends: customExtends })

        expect(configs[0].extends).toContain(customExtends[0])
    })

    test("root config requires volta.node", async () => {
        const workspaceEslint = new ESLint({
            overrideConfig: defineConfig(...packageJsonWorkspace()),
            overrideConfigFile: true,
        })

        const packageWithoutVolta = JSON.stringify(
            {
                author: "Test Author",
                description: "A test package",
                engines: { node: ">=24.0.0" },
                license: "MIT",
                name: "test-package",
                repository: { type: "git", url: "https://github.com/test/test" },
                version: "1.0.0",
            },
            null,
            4,
        )

        const results = await workspaceEslint.lintText(packageWithoutVolta, {
            filePath: "package.json",
        })

        const hasVoltaError = results[0]?.messages.some((message) => {
            return message.ruleId === "dvukovic/require-properties"
        })
        expect(hasVoltaError).toBe(true)
    })

    test("nested config does not require volta.node", async () => {
        const workspaceEslint = new ESLint({
            overrideConfig: defineConfig(...packageJsonWorkspace()),
            overrideConfigFile: true,
        })

        const packageWithoutVolta = JSON.stringify(
            {
                author: "Test Author",
                description: "A test package",
                engines: { node: ">=24.0.0" },
                license: "MIT",
                name: "test-package",
                repository: { type: "git", url: "https://github.com/test/test" },
                version: "1.0.0",
            },
            null,
            4,
        )

        const results = await workspaceEslint.lintText(packageWithoutVolta, {
            filePath: "packages/my-package/package.json",
        })

        const hasVoltaError = results[0]?.messages.some((message) => {
            return message.ruleId === "dvukovic/require-properties"
        })
        expect(hasVoltaError).toBe(false)
    })
})
