import { ESLint } from "eslint"
import jsoncParser from "jsonc-eslint-parser"

import { noRestrictedDependencies } from "./no-restricted-dependencies.js"

const createEslint = (options) => {
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
                    "custom/no-restricted-dependencies": ["error", options],
                },
            },
        ],
        overrideConfigFile: true,
    })
}

const getErrors = async (eslint, packageJson) => {
    const results = await eslint.lintText(packageJson, { filePath: "package.json" })

    return (
        results[0]?.messages.filter((message) => {
            return message.ruleId === "custom/no-restricted-dependencies"
        }) ?? []
    )
}

describe("no-restricted-dependencies", () => {
    test("detects restricted package in dependencies", async () => {
        const eslint = createEslint({ dependencies: ["lodash"] })
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

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(1)
        expect(errors[0]?.message).toContain("lodash")
    })

    test("detects restricted package in devDependencies", async () => {
        const eslint = createEslint({ devDependencies: ["jest"] })
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

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(1)
    })

    test("detects pattern with wildcard", async () => {
        const eslint = createEslint({ devDependencies: ["@types/*"] })
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

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(2)
    })

    test("allows non-restricted packages", async () => {
        const eslint = createEslint({ dependencies: ["lodash"] })
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

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(0)
    })

    test("detects multiple restricted packages", async () => {
        const eslint = createEslint({ dependencies: ["lodash", "ramda", "underscore"] })
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

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(2)
    })

    test("handles empty options", async () => {
        const eslint = createEslint({})
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

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(0)
    })

    test("restricts @types/* in dependencies but allows in devDependencies", async () => {
        const eslint = createEslint({ dependencies: ["@types/*"] })
        const packageJson = JSON.stringify(
            {
                dependencies: {
                    "@types/node": "^20.0.0",
                },
                devDependencies: {
                    "@types/react": "^18.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(1)
        expect(errors[0]?.message).toContain("@types/node")
        expect(errors[0]?.message).toContain("dependencies")
    })

    test("restricts different patterns in different dependency types", async () => {
        const eslint = createEslint({
            dependencies: ["@types/*", "lodash"],
            devDependencies: ["jest"],
        })
        const packageJson = JSON.stringify(
            {
                dependencies: {
                    "@types/node": "^20.0.0",
                    lodash: "^4.0.0",
                },
                devDependencies: {
                    "@types/react": "^18.0.0",
                    jest: "^29.0.0",
                },
                name: "test",
            },
            null,
            4,
        )

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(3)
    })

    test("restricts in peerDependencies", async () => {
        const eslint = createEslint({ peerDependencies: ["react"] })
        const packageJson = JSON.stringify(
            {
                name: "test",
                peerDependencies: {
                    react: "^18.0.0",
                },
            },
            null,
            4,
        )

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(1)
    })

    test("restricts in optionalDependencies", async () => {
        const eslint = createEslint({ optionalDependencies: ["fsevents"] })
        const packageJson = JSON.stringify(
            {
                name: "test",
                optionalDependencies: {
                    fsevents: "^2.0.0",
                },
            },
            null,
            4,
        )

        const errors = await getErrors(eslint, packageJson)

        expect(errors.length).toBe(1)
    })
})
