import {
    FILE_COMPOSITION,
    FILE_RULES,
    FOLDER_RULES,
    projectStructure,
} from "./project-structure.js"

describe("projectStructure", () => {
    test("adds the folder structure only when the project supplies one", () => {
        expect(projectStructure()).toHaveLength(1)
        expect(projectStructure({ folderStructure: { structure: [] } })).toHaveLength(2)
    })

    test("uses the shared file composition by default", () => {
        const [composition] = projectStructure()

        expect(composition?.rules["project-structure/file-composition"][1]).toBe(FILE_COMPOSITION)
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
})
