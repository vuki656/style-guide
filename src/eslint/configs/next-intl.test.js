import { ESLint } from "eslint"

import { nextIntl } from "./next-intl.js"

const eslint = new ESLint({
    overrideConfig: nextIntl(),
    overrideConfigFile: true,
})

const lint = async (code, filePath) => {
    const results = await eslint.lintText(code, { filePath })

    return results[0]?.messages.filter((message) => {
        return message.ruleId === "no-restricted-imports"
    })
}

describe("nextIntl", () => {
    test("rejects next/link", async () => {
        const messages = await lint(`import Link from "next/link"\n`, "src/page.tsx")

        expect(messages?.length).toBe(1)
    })

    test("rejects usePathname outside global errors", async () => {
        const messages = await lint(
            `import { usePathname } from "next/navigation"\n`,
            "src/page.tsx",
        )

        expect(messages?.length).toBe(1)
    })

    test("allows usePathname in global errors", async () => {
        const messages = await lint(
            `import { usePathname } from "next/navigation"\n`,
            "src/app/global-error.tsx",
        )

        expect(messages?.length).toBe(0)
    })

    test("keeps the barrel patterns", async () => {
        const messages = await lint(`import { a } from "@/shared/utils"\n`, "src/page.tsx")

        expect(messages?.length).toBe(1)
    })
})
