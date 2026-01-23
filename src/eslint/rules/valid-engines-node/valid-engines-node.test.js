import { ESLint } from "eslint"
import jsoncParser from "jsonc-eslint-parser"

import { validEnginesNode } from "./valid-engines-node.js"

const createEslint = (versions) => {
    return new ESLint({
        overrideConfig: [
            {
                files: ["**/package.json"],
                languageOptions: {
                    parser: jsoncParser,
                },
                plugins: {
                    custom: {
                        rules: {
                            "valid-engines-node": validEnginesNode,
                        },
                    },
                },
                rules: {
                    "custom/valid-engines-node": ["error", { versions }],
                },
            },
        ],
        overrideConfigFile: true,
    })
}

describe("valid-engines-node", () => {
    test("allows valid LTS version", async () => {
        const eslint = createEslint(["24"])
        const packageJson = JSON.stringify(
            {
                engines: {
                    node: ">=24.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/valid-engines-node"
        })

        expect(errors?.length).toBe(0)
    })

    test("allows version with just major number", async () => {
        const eslint = createEslint(["24"])
        const packageJson = JSON.stringify(
            {
                engines: {
                    node: ">=24",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/valid-engines-node"
        })

        expect(errors?.length).toBe(0)
    })

    test("rejects non-LTS version", async () => {
        const eslint = createEslint(["24"])
        const packageJson = JSON.stringify(
            {
                engines: {
                    node: ">=18.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/valid-engines-node"
        })

        expect(errors?.length).toBe(1)
        expect(errors?.[0]?.message).toContain("18.0.0")
    })

    test("rejects odd version numbers", async () => {
        const eslint = createEslint(["24"])
        const packageJson = JSON.stringify(
            {
                engines: {
                    node: ">=21.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/valid-engines-node"
        })

        expect(errors?.length).toBe(1)
    })

    test("handles missing engines field", async () => {
        const eslint = createEslint(["24"])
        const packageJson = JSON.stringify(
            {
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/valid-engines-node"
        })

        expect(errors?.length).toBe(0)
    })

    test("handles missing node in engines", async () => {
        const eslint = createEslint(["24"])
        const packageJson = JSON.stringify(
            {
                engines: {
                    npm: ">=9",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/valid-engines-node"
        })

        expect(errors?.length).toBe(0)
    })
})
