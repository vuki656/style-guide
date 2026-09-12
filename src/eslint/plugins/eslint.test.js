import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import { eslint as base } from "./eslint.js"

const eslint = new ESLint({
    overrideConfig: [
        {
            files: ["**/*.ts"],
            languageOptions: {
                parser: tseslint.parser,
            },
        },
        base,
    ],
    overrideConfigFile: true,
})

describe("eslint no-restricted-syntax", () => {
    test("detects enum declarations", async () => {
        const code = `enum Status { Active, Inactive }\n`
        const results = await eslint.lintText(code, { filePath: "test.ts" })

        const enumErrors = results[0]?.messages.filter((message) => {
            return message.ruleId === "no-restricted-syntax"
        })

        expect(enumErrors?.length).toBe(1)
        expect(enumErrors?.[0]?.message).toContain("enum")
    })

    test("detects wildcard re-exports", async () => {
        const code = `export * from "./other.js"\n`
        const results = await eslint.lintText(code, { filePath: "test.ts" })

        const wildcardErrors = results[0]?.messages.filter((message) => {
            return message.ruleId === "no-restricted-syntax"
        })

        expect(wildcardErrors?.length).toBe(1)
        expect(wildcardErrors?.[0]?.message).toContain("wildcard re-exports")
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
