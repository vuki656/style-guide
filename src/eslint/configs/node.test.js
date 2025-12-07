import { ESLint } from "eslint"

import { nodeConfig } from "./node.js"

const eslint = new ESLint({
    overrideConfig: nodeConfig,
    overrideConfigFile: true,
})

describe("node", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.js" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
