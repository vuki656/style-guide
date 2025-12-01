import { format } from "prettier"

import config from "./core.js"

describe("prettier core", () => {
    test("loads without errors", async () => {
        const result = await format("const x = 1", {
            ...config,
            parser: "babel",
        })

        expect(result).toBeDefined()
        expect(typeof result).toBe("string")
    })

    test("formats code correctly", async () => {
        const result = await format("const x=1", {
            ...config,
            parser: "babel",
        })

        expect(result).toContain("const x = 1")
    })
})
