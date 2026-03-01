import { ESLint } from "eslint"

import { dvukovic } from "../../plugins/dvukovic.js"

const RULE_ID = "dvukovic/no-instanceof-error"

const eslint = new ESLint({
    overrideConfig: [dvukovic],
    overrideConfigFile: true,
})

const eslintWithFix = new ESLint({
    fix: true,
    overrideConfig: [dvukovic],
    overrideConfigFile: true,
})

function getErrors(results) {
    return results[0]?.messages.filter((message) => {
        return message.ruleId === RULE_ID
    })
}

function getFixedOutput(results) {
    return results[0]?.output
}

describe(RULE_ID, () => {
    describe("detection", () => {
        test("detects instanceof Error in if statement", async () => {
            const code = `if (error instanceof Error) { console.log(error) }\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects instanceof Error in assignment", async () => {
            const code = `const isError = error instanceof Error\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects instanceof Error in ternary", async () => {
            const code = `const result = error instanceof Error ? "yes" : "no"\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects negated instanceof Error", async () => {
            const code = `if (!(error instanceof Error)) { throw error }\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects multiple instanceof Error in same file", async () => {
            const code = `const a = error instanceof Error\nconst b = value instanceof Error\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(2)
        })
    })

    describe("non-detection", () => {
        test("allows instanceof TypeError", async () => {
            const code = `if (error instanceof TypeError) { console.log(error) }\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows instanceof RangeError", async () => {
            const code = `if (error instanceof RangeError) { console.log(error) }\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows instanceof CustomError", async () => {
            const code = `if (error instanceof CustomError) { console.log(error) }\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows Error.isError()", async () => {
            const code = `if (Error.isError(error)) { console.log(error) }\n`

            const results = await eslint.lintText(code, { filePath: "test.js" })

            expect(getErrors(results)).toHaveLength(0)
        })
    })

    describe("auto-fix", () => {
        test("fixes instanceof Error to Error.isError()", async () => {
            const code = `const isError = error instanceof Error\n`

            const results = await eslintWithFix.lintText(code, { filePath: "test.js" })

            expect(getFixedOutput(results)).toBe(`const isError = Error.isError(error)\n`)
        })

        test("fixes negated instanceof Error", async () => {
            const code = `if (!(error instanceof Error)) { throw error }\n`

            const results = await eslintWithFix.lintText(code, { filePath: "test.js" })

            expect(getFixedOutput(results)).toBe(`if (!(Error.isError(error))) { throw error }\n`)
        })

        test("fixes instanceof Error in ternary", async () => {
            const code = `const result = error instanceof Error ? "yes" : "no"\n`

            const results = await eslintWithFix.lintText(code, { filePath: "test.js" })

            expect(getFixedOutput(results)).toBe(
                `const result = Error.isError(error) ? "yes" : "no"\n`,
            )
        })

        test("fixes complex left operand", async () => {
            const code = `const isError = (foo || bar) instanceof Error\n`

            const results = await eslintWithFix.lintText(code, { filePath: "test.js" })

            expect(getFixedOutput(results)).toBe(`const isError = Error.isError(foo || bar)\n`)
        })
    })
})
