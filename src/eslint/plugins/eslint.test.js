import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import eslintPlugin from "./eslint.js"

const eslint = new ESLint({
    overrideConfig: [
        {
            files: ["**/*.ts"],
            languageOptions: {
                parser: tseslint.parser,
            },
        },
        eslintPlugin,
    ],
    overrideConfigFile: true,
})

describe("eslint no-enum", () => {
    test("detects enum declarations", async () => {
        const code = `enum Status { Active, Inactive }\n`
        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const enumErrors = results[0]?.messages.filter((message) => {
            return message.ruleId === "no-restricted-syntax"
        })

        expect(enumErrors?.length).toBe(1)
        expect(enumErrors?.[0]?.message).toContain("enum")
    })

    test("allows union types", async () => {
        const code = `type Status = "active" | "inactive"\n`
        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const restrictedSyntaxErrors = results?.[0]?.messages.filter((message) => {
            return message.ruleId === "no-restricted-syntax"
        })

        expect(restrictedSyntaxErrors?.length).toBe(0)
    })
})
