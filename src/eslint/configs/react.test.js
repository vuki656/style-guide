import { ESLint } from "eslint"
import { defineConfig } from "eslint/config"

import { react, reactConfig } from "./react.js"

const eslint = new ESLint({
    overrideConfig: reactConfig,
    overrideConfigFile: true,
})

const restrictedSyntax = new ESLint({
    overrideConfig: defineConfig(react()),
    overrideConfigFile: true,
})

describe("react", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.tsx" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })

    test("rejects a helper declared next to the component", async () => {
        const code = `const helper = () => {\n    return 1\n}\n`
        const results = await restrictedSyntax.lintText(code, { filePath: "test.tsx" })

        const messages = results[0]?.messages.filter((message) => {
            return message.ruleId === "no-restricted-syntax"
        })

        expect(messages?.length).toBe(1)
        expect(messages?.[0]?.message).toContain("components only")
    })

    test("allows the component itself", async () => {
        const code = `export const Thing = () => {\n    return null\n}\n`
        const results = await restrictedSyntax.lintText(code, { filePath: "test.tsx" })

        const messages = results[0]?.messages.filter((message) => {
            return message.ruleId === "no-restricted-syntax"
        })

        expect(messages?.length).toBe(0)
    })
})
