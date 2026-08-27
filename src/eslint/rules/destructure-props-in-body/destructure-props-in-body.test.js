import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import { destructurePropsInBody } from "./destructure-props-in-body.js"

const RULE_ID = "dvukovic/destructure-props-in-body"

function createEslint(fix = false) {
    return new ESLint({
        fix,
        overrideConfig: [
            {
                files: ["**/*.ts", "**/*.tsx"],
                languageOptions: {
                    parser: tseslint.parser,
                },
                plugins: {
                    dvukovic: {
                        rules: {
                            "destructure-props-in-body": destructurePropsInBody,
                        },
                    },
                },
                rules: {
                    [RULE_ID]: "error",
                },
            },
        ],
        overrideConfigFile: true,
    })
}

const eslint = createEslint()
const fixingEslint = createEslint(true)

function getErrors(results) {
    return results[0]?.messages.filter((message) => {
        return message.ruleId === RULE_ID
    })
}

const FILE = "src/modules/users/UserList/UserList.tsx"

describe(RULE_ID, () => {
    describe("detection", () => {
        test("flags destructuring in an arrow component signature", async () => {
            const code = `export const Choice = ({ children }: ChoiceProps) => children\n`

            const results = await eslint.lintText(code, { filePath: FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags destructuring in a function declaration component", async () => {
            const code = `export function Choice({ children }: ChoiceProps) { return children }\n`

            const results = await eslint.lintText(code, { filePath: FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags destructuring with a default value", async () => {
            const code = `export const Choice = ({ children }: ChoiceProps = {}) => children\n`

            const results = await eslint.lintText(code, { filePath: FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags destructuring in a memo or forwardRef component", async () => {
            const code = `export const Choice = memo(({ children }: ChoiceProps) => children)\nexport const Input = forwardRef<HTMLInputElement, InputProps>(({ name }, ref) => name)\n`

            const results = await eslint.lintText(code, { filePath: FILE })

            expect(getErrors(results)).toHaveLength(2)
        })

        test("flags destructuring in an FC annotated component", async () => {
            const code = `export const Choice: FC<ChoiceProps> = ({ children }) => children\n`

            const results = await eslint.lintText(code, { filePath: FILE })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("flags destructuring in a default exported page component", async () => {
            const code = `export default function Page({ params }: PageProps) { return params.id }\n`

            const results = await eslint.lintText(code, { filePath: "src/app/users/page.tsx" })

            expect(getErrors(results)).toHaveLength(1)
        })
    })

    describe("non-detection", () => {
        test("allows a props parameter destructured in the body", async () => {
            const code = `export const Choice = (props: ChoiceProps) => {\n    const { children } = props\n\n    return children\n}\n`

            const results = await eslint.lintText(code, { filePath: FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows destructuring in non-component functions", async () => {
            const code = `const format = ({ value }: Row) => value\nfunction useThing({ id }: Options) { return id }\nconst ids = rows.map(({ id }) => id)\n`

            const results = await eslint.lintText(code, { filePath: FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows callbacks inside a component", async () => {
            const code = `export const List = (props: ListProps) => props.rows.map(({ id }) => id)\n`

            const results = await eslint.lintText(code, { filePath: FILE })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("ignores non-tsx files", async () => {
            const code = `export const Choice = ({ children }: ChoiceProps) => children\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/UserList/UserList.ts",
            })

            expect(getErrors(results)).toHaveLength(0)
        })
    })

    describe("fix", () => {
        test("moves destructuring into a block body", async () => {
            const code = `export const Choice = ({ children, onClick }: ChoiceProps) => {\n    return children\n}\n`

            const results = await fixingEslint.lintText(code, { filePath: FILE })

            expect(results[0].output).toBe(
                `export const Choice = (props: ChoiceProps) => {\nconst { children, onClick } = props\n\n    return children\n}\n`,
            )
        })

        test("wraps an expression body in a block", async () => {
            const code = `export const Choice = ({ children }: ChoiceProps) => <div>{children}</div>\n`

            const results = await fixingEslint.lintText(code, { filePath: FILE })

            expect(results[0].output).toBe(
                `export const Choice = (props: ChoiceProps) => {\nconst { children } = props\n\nreturn <div>{children}</div>\n}\n`,
            )
        })

        test("keeps the default value on the pattern", async () => {
            const code = `export function Choice({ children = "x" }: ChoiceProps) { return children }\n`

            const results = await fixingEslint.lintText(code, { filePath: FILE })

            expect(results[0].output).toBe(
                `export function Choice(props: ChoiceProps) {\nconst { children = "x" } = props\n return children }\n`,
            )
        })

        test("does not fix when props is already in use", async () => {
            const code = `export const Choice = ({ children }: ChoiceProps) => {\n    const props = useProps()\n\n    return children\n}\n`

            const results = await fixingEslint.lintText(code, { filePath: FILE })

            expect(results[0].output).toBeUndefined()
            expect(getErrors(results)).toHaveLength(1)
        })
    })
})
