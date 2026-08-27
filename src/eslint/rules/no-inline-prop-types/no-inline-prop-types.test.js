import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import { noInlinePropTypes } from "./no-inline-prop-types.js"

const RULE_ID = "dvukovic/no-inline-prop-types"

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
                            "no-inline-prop-types": noInlinePropTypes,
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

const MODULE_FILE = "src/modules/users/UserList/UserList.tsx"

describe(RULE_ID, () => {
    describe("detection", () => {
        test("flags an inline object type on an arrow component props param", async () => {
            const code = `export const Choice = (props: {
    readonly children: string
    readonly onClick: () => void
}) => props.children\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags an inline object type on a destructured props param", async () => {
            const code = `export const Choice = ({ children }: { children: string }) => children\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags an inline object type on a function declaration param", async () => {
            const code = `export function Choice(props: { children: string }) { return props.children }\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags an inline object type on a param with a default value", async () => {
            const code = `export const Choice = (props: { children?: string } = {}) => props.children\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags an inline object type inside a union or intersection", async () => {
            const code = `export const Choice = (props: BaseProps & { selected: boolean }) => props.selected\nexport const Other = (props: null | { selected: boolean }) => props\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(2)
        })

        test("flags an inline object type inside a generic wrapper", async () => {
            const code = `export const Choice = (props: Partial<{ selected: boolean }>) => props.selected\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags an inline object type in an FC annotation", async () => {
            const code = `import type { FC } from "react"\nexport const Choice: FC<{ selected: boolean }> = (props) => props.selected\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags an inline object type on a variable annotation", async () => {
            const code = `const columns: { key: string }[] = []\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags a component .tsx", async () => {
            const code = `export const Table = (props: { columns: string[] }) => props.columns\n`

            const results = await eslint.lintText(code, {
                filePath: "src/components/Table/Table.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("reports the outer object type once when nested", async () => {
            const code = `export const Choice = (props: { item: { id: string } }) => props.item.id\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(1)
        })
    })

    describe("non-detection", () => {
        test("allows a named props type", async () => {
            const code = `import type { ChoiceProps } from "./Choice.types"\nexport const Choice = (props: ChoiceProps) => props.children\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows a named FC type argument", async () => {
            const code = `import type { FC } from "react"\nimport type { ChoiceProps } from "./Choice.types"\nexport const Choice: FC<ChoiceProps> = (props) => props.children\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows primitive and named param annotations", async () => {
            const code = `export const format = (value: string, items: Item[]) => value + items.length\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows object types in return annotations", async () => {
            const code = `export const useThing = (): { value: string } => ({ value: "" })\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows object types in as and satisfies expressions", async () => {
            const code = `const value = {} as { a: number }\nconst other = { a: 1 } satisfies { a: number }\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows object types in call type arguments", async () => {
            const code = `import { useState } from "react"\nexport const Choice = () => useState<{ open: boolean }>({ open: false })\n`

            const results = await eslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows inline object types in a sibling .types.ts file", async () => {
            const code = `export const format = (value: { a: string }) => value.a\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.types.ts",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("ignores .tsx files outside the configured directories", async () => {
            const code = `export default function Page(props: { params: { id: string } }) { return props.params.id }\n`

            const results = await eslint.lintText(code, { filePath: "src/app/users/page.tsx" })

            expect(getErrors(results)).toHaveLength(0)
        })
    })

    describe("options", () => {
        test("supports a custom directories list", async () => {
            const customEslint = createEslint({ directories: ["app/features"] })
            const code = `export const Form = (props: { name: string }) => props.name\n`

            const results = await customEslint.lintText(code, {
                filePath: "app/features/settings/Form.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("does not flag directories outside the custom list", async () => {
            const customEslint = createEslint({ directories: ["app/features"] })
            const code = `export const Form = (props: { name: string }) => props.name\n`

            const results = await customEslint.lintText(code, { filePath: MODULE_FILE })

            expect(getErrors(results)).toHaveLength(0)
        })
    })
})
