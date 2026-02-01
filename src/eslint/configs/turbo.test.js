import { ESLint } from "eslint"

import { turboConfig } from "./turbo.js"

const eslint = new ESLint({
    overrideConfig: turboConfig,
    overrideConfigFile: true,
})

describe("turbo", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.js" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
