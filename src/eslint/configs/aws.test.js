import { ESLint } from "eslint"

import { awsConfig } from "./aws.js"

const eslint = new ESLint({
    overrideConfig: awsConfig,
    overrideConfigFile: true,
})

describe("aws", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.js" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
