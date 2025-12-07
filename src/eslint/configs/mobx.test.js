import { ESLint } from "eslint"

import { mobxConfig } from "./mobx.js"

const eslint = new ESLint({
    overrideConfig: mobxConfig,
    overrideConfigFile: true,
})

describe("mobx", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.js" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
