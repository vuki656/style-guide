import { ESLint } from "eslint"

import { nextjsExportName } from "./nextjs-export-name.js"

const RULE_ID = "dvukovic/nextjs-export-name"

const pluginConfig = {
    files: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.jsx"],
    plugins: {
        dvukovic: {
            rules: {
                "nextjs-export-name": nextjsExportName,
            },
        },
    },
    rules: {
        [RULE_ID]: "error",
    },
}

const eslint = new ESLint({
    overrideConfig: [pluginConfig],
    overrideConfigFile: true,
})

const eslintWithFix = new ESLint({
    fix: true,
    overrideConfig: [pluginConfig],
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
        test("detects misnamed default export in layout.tsx", async () => {
            const code = `export default function Foo() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/layout.tsx" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects misnamed default export in not-found.tsx", async () => {
            const code = `export default function Foo() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/not-found.tsx" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects misnamed default export in global-error.tsx", async () => {
            const code = `export default function Foo() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/global-error.tsx" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects misnamed default export in page.tsx", async () => {
            const code = `export default function Foo() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/dashboard/page.tsx" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects anonymous default export in page.tsx", async () => {
            const code = `export default function() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/page.tsx" })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects misnamed arrow function via identifier export", async () => {
            const code = `const Foo = () => null\nexport default Foo\n`

            const results = await eslint.lintText(code, { filePath: "app/layout.tsx" })

            expect(getErrors(results)).toHaveLength(1)
        })
    })

    describe("non-detection", () => {
        test("allows correctly named default export in layout.tsx", async () => {
            const code = `export default function Layout() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/layout.tsx" })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows correctly named default export in page.tsx", async () => {
            const code = `export default function Page() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/page.tsx" })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows correctly named default export in not-found.tsx", async () => {
            const code = `export default function NotFound() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/not-found.tsx" })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows any default export name in non-special files", async () => {
            const code = `export default function Anything() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "utils.ts" })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows any default export name in route.ts", async () => {
            const code = `export default function Anything() { return null }\n`

            const results = await eslint.lintText(code, { filePath: "app/api/route.ts" })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows correctly named arrow function via identifier export", async () => {
            const code = `const Layout = () => null\nexport default Layout\n`

            const results = await eslint.lintText(code, { filePath: "app/layout.tsx" })

            expect(getErrors(results)).toHaveLength(0)
        })
    })

    describe("auto-fix", () => {
        test("renames misnamed default export in layout.tsx", async () => {
            const code = `export default function Foo() { return null }\n`

            const results = await eslintWithFix.lintText(code, { filePath: "app/layout.tsx" })

            expect(getFixedOutput(results)).toBe(
                `export default function Layout() { return null }\n`,
            )
        })

        test("renames misnamed default export in not-found.tsx", async () => {
            const code = `export default function Foo() { return null }\n`

            const results = await eslintWithFix.lintText(code, { filePath: "app/not-found.tsx" })

            expect(getFixedOutput(results)).toBe(
                `export default function NotFound() { return null }\n`,
            )
        })

        test("renames misnamed default export in global-error.tsx", async () => {
            const code = `export default function Foo() { return null }\n`

            const results = await eslintWithFix.lintText(code, {
                filePath: "app/global-error.tsx",
            })

            expect(getFixedOutput(results)).toBe(
                `export default function GlobalError() { return null }\n`,
            )
        })

        test("renames misnamed arrow function via identifier export", async () => {
            const code = `const Foo = () => null\nexport default Foo\n`

            const results = await eslintWithFix.lintText(code, { filePath: "app/layout.tsx" })

            expect(getFixedOutput(results)).toBe(
                `const Layout = () => null\nexport default Layout\n`,
            )
        })

        test("does not fix anonymous default export", async () => {
            const code = `export default function() { return null }\n`

            const results = await eslintWithFix.lintText(code, { filePath: "app/page.tsx" })

            expect(getFixedOutput(results)).toBeUndefined()
            expect(getErrors(results)).toHaveLength(1)
        })
    })
})
