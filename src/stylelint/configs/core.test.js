import stylelint from "stylelint"

import config from "./core.js"

describe("stylelint core", () => {
    test("loads without errors", async () => {
        const result = await stylelint.lint({
            code: "a { padding: 10px; }",
            config,
        })

        expect(result).toBeDefined()
        expect(result.errored).toBe(false)
    })

    test("detects violations", async () => {
        const result = await stylelint.lint({
            code: "a { color: red;; }",
            config,
        })

        expect(result.errored).toBe(true)
    })
})
