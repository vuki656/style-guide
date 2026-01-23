import { ESLint } from "eslint"
import jsoncParser from "jsonc-eslint-parser"

import { noRestrictedDependencies } from "./no-restricted-dependencies.js"

const createEslint = (packages) => {
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
                            "no-restricted-dependencies": noRestrictedDependencies,
                        },
                    },
                },
                rules: {
                    "custom/no-restricted-dependencies": ["error", { packages }],
                },
            },
        ],
        overrideConfigFile: true,
    })
}

describe("no-restricted-dependencies", () => {
    test("detects restricted package in dependencies", async () => {
        const eslint = createEslint(["lodash"])
        const packageJson = JSON.stringify(
            {
                dependencies: {
                    lodash: "^4.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/no-restricted-dependencies"
        })

        expect(errors?.length).toBe(1)
        expect(errors?.[0]?.message).toContain("lodash")
    })

    test("detects restricted package in devDependencies", async () => {
        const eslint = createEslint(["jest"])
        const packageJson = JSON.stringify(
            {
                devDependencies: {
                    jest: "^29.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/no-restricted-dependencies"
        })

        expect(errors?.length).toBe(1)
    })

    test("detects pattern with wildcard", async () => {
        const eslint = createEslint(["@types/*"])
        const packageJson = JSON.stringify(
            {
                devDependencies: {
                    "@types/node": "^20.0.0",
                    "@types/react": "^18.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/no-restricted-dependencies"
        })

        expect(errors?.length).toBe(2)
    })

    test("allows non-restricted packages", async () => {
        const eslint = createEslint(["lodash"])
        const packageJson = JSON.stringify(
            {
                dependencies: {
                    react: "^18.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/no-restricted-dependencies"
        })

        expect(errors?.length).toBe(0)
    })

    test("detects multiple restricted packages", async () => {
        const eslint = createEslint(["lodash", "ramda", "underscore"])
        const packageJson = JSON.stringify(
            {
                dependencies: {
                    lodash: "^4.0.0",
                    ramda: "^0.29.0",
                    react: "^18.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/no-restricted-dependencies"
        })

        expect(errors?.length).toBe(2)
    })

    test("handles empty packages list", async () => {
        const eslint = createEslint([])
        const packageJson = JSON.stringify(
            {
                dependencies: {
                    lodash: "^4.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const results = await eslint.lintText(packageJson, { filePath: "package.json" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/no-restricted-dependencies"
        })

        expect(errors?.length).toBe(0)
    })
})
