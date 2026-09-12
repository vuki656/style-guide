import { FILE_RULES, FOLDER_RULES, projectStructure } from "./project-structure.js"

describe("projectStructure", () => {
    test("wires only the configs it was given", () => {
        expect(projectStructure({ folderStructure: { structure: [] } })).toHaveLength(1)
        expect(projectStructure({ fileComposition: { filesRules: [] } })).toHaveLength(1)
        expect(projectStructure()).toHaveLength(0)
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
