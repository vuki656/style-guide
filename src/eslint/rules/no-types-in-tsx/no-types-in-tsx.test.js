import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import { noTypesInTsx } from "./no-types-in-tsx.js"

const RULE_ID = "dvukovic/no-types-in-tsx"

function createEslint(ruleOptions) {
    return new ESLint({
        overrideConfig: [
            {
                files: ["**/*.ts", "**/*.tsx"],
                languageOptions: {
                    parser: tseslint.parser,
                },
                plugins: {
                    dvukovic: {
                        rules: {
                            "no-types-in-tsx": noTypesInTsx,
                        },
                    },
                },
                rules: {
                    [RULE_ID]: ruleOptions ? ["error", ruleOptions] : "error",
                },
            },
        ],
        overrideConfigFile: true,
    })
}

const eslint = createEslint()

function getErrors(results) {
    return results[0]?.messages.filter((message) => {
        return message.ruleId === RULE_ID
    })
}

describe(RULE_ID, () => {
    describe("detection", () => {
        test("flags a type alias declaration in a module .tsx", async () => {
            const code = `type FooProps = { a: string }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags an interface declaration in a module .tsx", async () => {
            const code = `interface FooProps { a: string }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags a local (non-exported) type declaration", async () => {
            const code = `type LocalRow = { id: string }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags an exported type declaration", async () => {
            const code = `export type FooProps = { a: string }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags a type declaration in a component .tsx", async () => {
            const code = `type TableProps = { columns: string[] }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/components/Table/Table.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags each declaration when several are present", async () => {
            const code = `type A = { a: string }\ninterface B { b: number }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(2)
        })
    })

    describe("non-detection", () => {
        test("allows inline annotations on component props", async () => {
            const code = `export const Foo = (props: { a: string }) => props.a\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows generic type parameters", async () => {
            const code = `export const identity = <TData,>(value: TData) => value\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows type-only re-exports", async () => {
            const code = `export type { TableProps } from "./Table.types"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows as and satisfies expressions", async () => {
            const code = `const value = { a: 1 } satisfies Record<string, number>\nconst other = value as unknown\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows enum declarations", async () => {
            const code = `enum Status { Active, Idle }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows type declarations in a sibling .types.ts file", async () => {
            const code = `export type FooProps = { a: string }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.types.ts",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("ignores .tsx files outside the configured directories", async () => {
            const code = `type PageProps = { params: { id: string } }\n`

            const results = await eslint.lintText(code, {
                filePath: "src/app/users/page.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })
    })

    describe("options", () => {
        test("supports a custom directories list", async () => {
            const customEslint = createEslint({ directories: ["app/features"] })
            const code = `type FormProps = { name: string }\n`

            const results = await customEslint.lintText(code, {
                filePath: "app/features/settings/Form.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("does not flag directories outside the custom list", async () => {
            const customEslint = createEslint({ directories: ["app/features"] })
            const code = `type FormProps = { name: string }\n`

            const results = await customEslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })
    })
})
