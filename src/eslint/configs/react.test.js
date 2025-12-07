import { ESLint } from "eslint"

import { reactConfig } from "./react.js"

const eslint = new ESLint({
    overrideConfig: reactConfig,
    overrideConfigFile: true,
})

describe("react", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.tsx" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
