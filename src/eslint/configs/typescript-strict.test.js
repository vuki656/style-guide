import { ESLint } from "eslint"

import config from "./typescript-strict.js"

const eslint = new ESLint({
    overrideConfig: config,
    overrideConfigFile: true,
})

describe("typescript-strict", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x: number = 1\n", { filePath: "test.ts" })

        expect(results).toBeDefined()
        expect(results[0].fatalErrorCount).toBe(0)
    })
})
