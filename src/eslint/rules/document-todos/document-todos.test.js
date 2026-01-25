import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import { documentTodos } from "./document-todos.js"

const createEslint = (url = "http") => {
    return new ESLint({
        overrideConfig: [
            {
                files: ["**/*.ts"],
                languageOptions: {
                    parser: tseslint.parser,
                },
                plugins: {
                    dvukovic: {
                        rules: {
                            "document-todos": documentTodos,
                        },
                    },
                },
                rules: {
                    "dvukovic/document-todos": ["error", { url }],
                },
            },
        ],
        overrideConfigFile: true,
    })
}

describe("dvukovic/document-todos", () => {
    test("reports TODO without URL", async () => {
        const eslint = createEslint()
        const code = `// TODO: fix this later\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(1)
    })

    test("reports FIXME without URL", async () => {
        const eslint = createEslint()
        const code = `// FIXME: broken feature\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(1)
    })

    test("allows TODO with URL", async () => {
        const eslint = createEslint()
        const code = `// TODO: fix this later https://github.com/issue/1\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(0)
    })

    test("allows FIXME with URL", async () => {
        const eslint = createEslint()
        const code = `// FIXME: broken feature http://jira.com/123\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(0)
    })

    test("allows regular comments", async () => {
        const eslint = createEslint()
        const code = `// This is a regular comment\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(0)
    })

    test("reports lowercase todo without URL", async () => {
        const eslint = createEslint()
        const code = `// todo fix this later\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(1)
    })

    test("reports lowercase fixme without URL", async () => {
        const eslint = createEslint()
        const code = `// fixme broken feature\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(1)
    })

    test("reports TODO in block comments without URL", async () => {
        const eslint = createEslint()
        const code = `/* TODO: fix this later */\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(1)
    })

    test("allows TODO in block comments with URL", async () => {
        const eslint = createEslint()
        const code = `/* TODO: fix this https://example.com/issue/1 */\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(0)
    })

    test("uses custom URL prefix", async () => {
        const eslint = createEslint("https://jira.example.com")
        const code = `// TODO: fix this https://jira.example.com/PROJ-123\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(0)
    })

    test("reports when URL does not match custom prefix", async () => {
        const eslint = createEslint("https://jira.example.com")
        const code = `// TODO: fix this https://github.com/issue/1\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(1)
    })

    test("reports multiple TODO comments without URLs", async () => {
        const eslint = createEslint()
        const code = `// TODO: first issue\n// TODO: second issue\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/document-todos"
        })

        expect(errors?.length).toBe(2)
    })
})
