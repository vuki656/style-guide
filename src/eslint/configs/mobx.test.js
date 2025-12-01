import { ESLint } from "eslint"

import config from "./mobx.js"

const eslint = new ESLint({
    overrideConfig: config,
    overrideConfigFile: true,
})

describe("mobx", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.js" })

        expect(results).toBeDefined()
        expect(results[0].fatalErrorCount).toBe(0)
    })
})
