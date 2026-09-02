import { defineConfig } from "@eslint/config-helpers"
import { ESLint } from "eslint"

import { playwright, playwrightConfig } from "./playwright.js"

const eslint = new ESLint({
    overrideConfig: playwrightConfig,
    overrideConfigFile: true,
})

describe("playwright", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.spec.ts" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})

describe("playwright()", () => {
    test("counts expect-prefixed helpers as assertions", async () => {
        const linter = new ESLint({
            overrideConfig: defineConfig(playwright()),
            overrideConfigFile: true,
        })
        const source = [
            'import { test } from "@playwright/test"',
            "",
            'test.describe("x", () => {',
            '    test("y", async ({ page }) => {',
            "        await expectAll(page)",
            "    })",
            "})",
            "",
        ].join("\n")
        const results = await linter.lintText(source, { filePath: "tool.e2e.ts" })

        expect(
            results[0]?.messages.filter((message) => {
                return message.ruleId === "playwright/expect-expect"
            }),
        ).toHaveLength(0)
    })
})
