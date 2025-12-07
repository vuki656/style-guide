import { ESLint } from "eslint"

import { typescriptStrictConfig } from "./typescript-strict.js"

const eslint = new ESLint({
    overrideConfig: typescriptStrictConfig,
    overrideConfigFile: true,
})

describe("typescript-strict", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x: number = 1\n", {
            filePath: "src/eslint/configs/typescript-strict.test.ts",
        })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
