import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import { dvukovic } from "../../plugins/dvukovic.js"

const eslint = new ESLint({
    overrideConfig: [
        {
            files: ["**/*.ts"],
            languageOptions: {
                parser: tseslint.parser,
            },
        },
        dvukovic,
    ],
    overrideConfigFile: true,
})

describe("dvukovic/no-commented-out-code", () => {
    test("detects commented-out code", async () => {
        const code = `// const x = 1\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-commented-out-code"
        })

        expect(errors?.length).toBe(1)
    })

    test("detects multi-line commented-out code", async () => {
        const code = `// function foo() {
//     return 1
// }
const y = 2
`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-commented-out-code"
        })

        expect(errors?.length).toBe(1)
    })

    test("detects block commented-out code", async () => {
        const code = `/* const x = 1 */\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-commented-out-code"
        })

        expect(errors?.length).toBe(1)
    })

    test("allows regular comments", async () => {
        const code = `// This is a regular comment\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-commented-out-code"
        })

        expect(errors?.length).toBe(0)
    })

    test("allows TODO comments", async () => {
        const code = `// TODO: fix this later\nconst y = 2\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-commented-out-code"
        })

        expect(errors).toHaveLength(0)
    })

    test("allows region comments", async () => {
        const code = `// #region\nconst y = 2\n// #endregion\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-commented-out-code"
        })

        expect(errors).toHaveLength(0)
    })
})
