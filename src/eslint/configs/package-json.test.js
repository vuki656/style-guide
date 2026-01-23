import { ESLint } from "eslint"

import { packageJsonConfigs } from "./package-json.js"

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
