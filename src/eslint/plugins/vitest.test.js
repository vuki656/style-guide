import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import { vitest as config } from "./vitest.js"

const eslint = new ESLint({
    fix: true,
    overrideConfig: [
        {
            files: ["**/*.ts"],
            languageOptions: {
                parser: tseslint.parser,
            },
        },
        {
            ...config,
            rules: { "@vitest/prefer-called-with": "error" },
        },
    ],
    overrideConfigFile: true,
})

describe("vitest prefer-called-with", () => {
    test("reports a call assertion without arguments and leaves it for a person to fill in", async () => {
        const code = `import { expect, test, vi } from "vitest"\n\ntest("calls", () => {\n    const spy = vi.fn()\n\n    spy("value")\n\n    expect(spy).toHaveBeenCalledOnce()\n})\n`
        const [result] = await eslint.lintText(code, { filePath: "calls.test.ts" })

        const ruleIds = result?.messages.map((message) => {
            return message.ruleId
        })

        expect(ruleIds).toStrictEqual(["@vitest/prefer-called-with"])
        expect(result?.output).toBeUndefined()
    })
})
