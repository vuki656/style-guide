import { ESLint } from "eslint"
import jsoncParser from "jsonc-eslint-parser"

import { requireProperties } from "./require-properties.js"

const createEslint = (properties) => {
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
                            "require-properties": requireProperties,
                        },
                    },
                },
                rules: {
                    "custom/require-properties": ["error", { properties }],
                },
            },
        ],
        overrideConfigFile: true,
    })
}

describe("require-properties", () => {
    test("passes when all required properties exist", async () => {
        const eslint = createEslint(["name", "version"])
        const packageJson = JSON.stringify(
            {
                name: "test",
                version: "1.0.0",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/require-properties"
        })

        expect(errors?.length).toBe(0)
    })

    test("fails when a required property is missing", async () => {
        const eslint = createEslint(["name", "version"])
        const packageJson = JSON.stringify(
            {
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/require-properties"
        })

        expect(errors?.length).toBe(1)
        expect(errors?.[0]?.message).toContain("version")
    })

    test("fails with multiple missing properties", async () => {
        const eslint = createEslint(["name", "version", "description"])
        const packageJson = JSON.stringify(
            {
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/require-properties"
        })

        expect(errors?.length).toBe(2)
    })

    test("passes with empty properties config", async () => {
        const eslint = createEslint([])
        const packageJson = JSON.stringify(
            {
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/require-properties"
        })

        expect(errors?.length).toBe(0)
    })

    test("supports dot notation for nested properties", async () => {
        const eslint = createEslint(["volta.node"])
        const packageJson = JSON.stringify(
            {
                name: "test",
                volta: {
                    node: "24.0.0",
                },
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/require-properties"
        })

        expect(errors?.length).toBe(0)
    })

    test("fails when nested property is missing", async () => {
        const eslint = createEslint(["volta.node"])
        const packageJson = JSON.stringify(
            {
                name: "test",
                volta: {},
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/require-properties"
        })

        expect(errors?.length).toBe(1)
        expect(errors?.[0]?.message).toContain("volta.node")
    })

    test("fails when parent of nested property is missing", async () => {
        const eslint = createEslint(["volta.node"])
        const packageJson = JSON.stringify(
            {
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/require-properties"
        })

        expect(errors?.length).toBe(1)
        expect(errors?.[0]?.message).toContain("volta.node")
    })
})
