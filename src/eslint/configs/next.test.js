import { ESLint } from "eslint"

import { nextConfig } from "./next.js"

const eslint = new ESLint({
    overrideConfig: nextConfig,
    overrideConfigFile: true,
})

describe("next", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.tsx" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
