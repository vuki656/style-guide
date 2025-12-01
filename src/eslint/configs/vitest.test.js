const { ESLint } = require("eslint")

const config = require("./vitest.js")

const eslint = new ESLint({
    overrideConfig: config,
    overrideConfigFile: true,
})

describe("vitest", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.test.ts" })

        expect(results).toBeDefined()
        expect(results[0].fatalErrorCount).toBe(0)
    })
})

