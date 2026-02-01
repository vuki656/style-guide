import { ESLint } from "eslint"

import { tanstackQueryConfig } from "./tanstack-query.js"

const eslint = new ESLint({
    overrideConfig: tanstackQueryConfig,
    overrideConfigFile: true,
})

describe("tanstack-query", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.ts" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
