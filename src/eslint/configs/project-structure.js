import {
    FILE_COMPOSITION,
    projectStructureParser,
    projectStructurePlugin,
} from "../plugins/project-structure.js"

/**
 * Wires the project-structure plugin. File composition is shared, the folder structure comes from
 * the project because only it knows its own tree.
 *
 * @param {{
 *     fileComposition?: object
 *     fileCompositionFiles?: string[]
 *     folderStructure?: object
 * }} [config]
 *   - Project configs
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends[]} ESLint configs
 */
export function projectStructure(config) {
    const {
        fileComposition = FILE_COMPOSITION,
        fileCompositionFiles = ["src/**/*.{ts,tsx}"],
        folderStructure,
    } = config ?? {}

    const configs = []

    if (folderStructure) {
        configs.push({
            files: ["**"],
            languageOptions: { parser: projectStructureParser },
            plugins: { "project-structure": projectStructurePlugin },
            rules: { "project-structure/folder-structure": ["error", folderStructure] },
        })
    }

    if (fileComposition) {
        configs.push({
            files: fileCompositionFiles,
            plugins: { "project-structure": projectStructurePlugin },
            rules: { "project-structure/file-composition": ["error", fileComposition] },
        })
    }

    return configs
}

export { FILE_COMPOSITION, FILE_RULES, FOLDER_RULES } from "../plugins/project-structure.js"
