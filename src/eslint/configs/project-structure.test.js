import { ESLint } from "eslint"
import tseslint from "typescript-eslint"

import {
    FILE_COMPOSITION,
    FILE_RULES,
    FOLDER_RULES,
    folderStructure,
    projectStructure,
} from "./project-structure.js"

const compositionEslint = new ESLint({
    overrideConfig: [
        { files: ["**/*.ts"], languageOptions: { parser: tseslint.parser } },
        ...projectStructure(),
    ],
    overrideConfigFile: true,
})

const lintComposition = async (code, filePath) => {
    const results = await compositionEslint.lintText(code, { filePath })

    return results[0]?.messages.filter((message) => {
        return message.ruleId === "project-structure/file-composition"
    })
}

const UTILS_FILE = "src/ui/components/PageHero/PageHero.utils.ts"

describe("projectStructure", () => {
    test("adds the folder structure only when the project supplies one", () => {
        expect(projectStructure()).toHaveLength(1)
        expect(projectStructure({ folderStructure: { structure: [] } })).toHaveLength(2)
    })

    test("uses the shared file composition by default", () => {
        const [composition] = projectStructure()

        expect(composition?.rules["project-structure/file-composition"][1]).toBe(FILE_COMPOSITION)
    })

    test("puts project folders in the container they were given for", () => {
        const { structure } = folderStructure({ shared: [{ name: "theme" }] })

        const source = structure.find((node) => {
            return node.name === "src"
        })

        const shared = source.children.find((node) => {
            return node.name === "shared"
        })

        expect(shared.children).toContainEqual({ name: "theme" })
    })

    test("leaves the file pattern to the project", () => {
        for (const rule of Object.values(FILE_RULES)) {
            expect(rule).not.toHaveProperty("filePattern")
        }
    })

    test("resolves every rule referenced by another rule", () => {
        const referenced = Object.values(FOLDER_RULES).flatMap((rule) => {
            return (rule.children ?? []).map((child) => {
                return child.ruleId
            })
        })

        for (const ruleId of referenced.filter(Boolean)) {
            expect(FOLDER_RULES[ruleId]).toBeDefined()
        }
    })

    test("applies the project root to both rules", () => {
        const [folders, composition] = projectStructure({
            folderStructure: { structure: [] },
            projectRoot: "apps/web",
        })

        expect(composition?.rules["project-structure/file-composition"][1]).toMatchObject({
            projectRoot: "apps/web",
        })
        expect(folders?.rules["project-structure/folder-structure"][1]).toMatchObject({
            projectRoot: "apps/web",
        })
    })

    test("allows hooks, variants and stories files in a component folder", () => {
        const names = FOLDER_RULES.componentFolder.children.map((child) => {
            return child.name
        })

        expect(names).toContain("{FolderName}.stories.tsx")
        expect(names.join(" ")).toMatch(/\|hooks\|variants\|/u)
    })

    test("keeps stories out of the one-component file rule", () => {
        const [componentRule] = FILE_COMPOSITION.filesRules

        expect(componentRule.filePattern).toStrictEqual([
            ["src/**/*.tsx", "!(src/app/**)", "!(**/*.stories.tsx)"],
        ])
    })

    test("rejects a SNAKE_CASE constant exported from a utils file", async () => {
        const messages = await lintComposition(`export const DEFAULT_TITLE = "Title"\n`, UTILS_FILE)

        expect(messages).toHaveLength(1)
    })

    test("allows a camelCase function exported from a utils file", async () => {
        const messages = await lintComposition(
            `const PREFIX = "a"\n\nexport const pageTitle = (title: string) => PREFIX + title\n\nexport function pageLabel(label: string) {\n    return label\n}\n`,
            UTILS_FILE,
        )

        expect(messages).toHaveLength(0)
    })

    test("keeps error classes in a shared helper errors file out of the utils file rule", async () => {
        const messages = await lintComposition(
            `export class ApiFetchError extends Error {}\n`,
            "src/shared/helpers/apiFetch/apiFetch.errors.ts",
        )

        expect(messages).toHaveLength(0)
    })
})
