import { ESLint } from "eslint"

import { typescriptConfig } from "./typescript.js"

const eslint = new ESLint({
    overrideConfig: typescriptConfig,
    overrideConfigFile: true,
})

describe("typescript", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", {
            filePath: "src/eslint/configs/typescript.test.js",
        })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
