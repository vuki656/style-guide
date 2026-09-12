import { ESLint } from "eslint"

import { noBarrelsConfig } from "./no-barrels.js"

const eslint = new ESLint({
    overrideConfig: noBarrelsConfig,
    overrideConfigFile: true,
})

const lint = async (code) => {
    const results = await eslint.lintText(code, { filePath: "test.js" })

    return results[0]?.messages.filter((message) => {
        return message.ruleId === "no-restricted-imports"
    })
}

describe("noBarrels", () => {
    test("rejects an aggregate layer import", async () => {
        const messages = await lint(`import { a } from "@/shared/utils"\n`)

        expect(messages?.length).toBe(1)
    })

    test("rejects a current directory barrel import", async () => {
        const messages = await lint(`import { a } from "."\n`)

        expect(messages?.length).toBe(1)
    })

    test("allows a specific module import", async () => {
        const messages = await lint(`import { a } from "@/shared/utils/string/capitalize"\n`)

        expect(messages?.length).toBe(0)
    })
})
