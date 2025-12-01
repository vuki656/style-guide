import { ESLint } from "eslint"

import config from "./typescript.js"

const eslint = new ESLint({
    overrideConfig: config,
    overrideConfigFile: true,
})

describe("typescript", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x: number = 1\n", { filePath: "test.ts" })

        expect(results).toBeDefined()
        expect(results[0].fatalErrorCount).toBe(0)
    })
})
