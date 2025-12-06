import { ESLint } from "eslint"

import config from "./core.js"

const eslint = new ESLint({
    overrideConfig: config,
    overrideConfigFile: true,
})

describe("core", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.js" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })

    test("detects violations", async () => {
        const results = await eslint.lintText("var x = 1\n", { filePath: "test.js" })

        expect(results[0]?.errorCount).toBeGreaterThan(0)
    })
})
