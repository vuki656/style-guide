import { ESLint } from "eslint"

import { storybookConfig } from "./storybook.js"

const eslint = new ESLint({
    overrideConfig: storybookConfig,
    overrideConfigFile: true,
})

describe("storybook", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText("const x = 1\n", { filePath: "test.stories.tsx" })

        expect(results).toBeDefined()
        expect(results[0]?.fatalErrorCount).toBe(0)
    })
})
