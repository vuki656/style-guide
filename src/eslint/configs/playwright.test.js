import { ESLint } from "eslint"

import { playwrightConfig } from "./playwright.js"

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
