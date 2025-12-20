import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import { dvukovic } from "../../plugins/dvukovic.js"

const eslint = new ESLint({
    overrideConfig: [
        {
            files: ["**/*.ts"],
            languageOptions: {
                parser: tseslint.parser,
            },
        },
        dvukovic,
    ],
    overrideConfigFile: true,
})

describe("dvukovic/no-t", () => {
    test("detects single-character type parameter", async () => {
        const code = `function foo<T>(arg: T): T { return arg }\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-t"
        })

        expect(errors?.length).toBe(1)
    })

    test("detects multiple single-character type parameters", async () => {
        const code = `type Entry<K, V> = { key: K; value: V }\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-t"
        })

        expect(errors?.length).toBe(2)
    })

    test("allows descriptive type parameters", async () => {
        const code = `function foo<Element>(arg: Element): Element { return arg }\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-t"
        })

        expect(errors?.length).toBe(0)
    })

    test("allows descriptive type parameters in type alias", async () => {
        const code = `type Entry<Key, Value> = { key: Key; value: Value }\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-t"
        })

        expect(errors?.length).toBe(0)
    })

    test("detects single-character in interface", async () => {
        const code = `interface Container<T> { value: T }\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-t"
        })

        expect(errors?.length).toBe(1)
    })

    test("detects single-character in class", async () => {
        const code = `class Box<T> { constructor(public value: T) {} }\n`

        const results = await eslint.lintText(code, { filePath: "test.ts" })
        const errors = results[0]?.messages.filter((message) => {
            return message.ruleId === "dvukovic/no-t"
        })

        expect(errors?.length).toBe(1)
    })
})
