import { ESLint } from "eslint"

import { jestConfig } from "./jest.js"

const eslint = new ESLint({
    overrideConfig: jestConfig,
    overrideConfigFile: true,
})

describe("jest", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.test.js" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
