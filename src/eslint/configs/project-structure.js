import { createFolderStructure } from "eslint-plugin-project-structure"

import {
    FILE_COMPOSITION,
    FOLDER_RULES,
    projectStructureParser,
    projectStructurePlugin,
} from "../plugins/project-structure.js"

/**
 * Folder structure for the shared tree, extended per container
 *
 * @param {{
 *     constants?: object[]
 *     ignorePatterns?: string[]
 *     modules?: object[]
 *     root?: object[]
 *     shared?: object[]
 *     src?: object[]
 *     ui?: object[]
 * }} [config]
 *   - Folders this project adds
 *
 * @returns {object} Folder structure config
 */
export function folderStructure(config) {
    const {
        constants = [],
        ignorePatterns = [],
        modules = [],
        root = [],
        shared = [],
        src = [],
        ui = [],
    } = config ?? {}

    return createFolderStructure({
        ignorePatterns,
        longPathsInfo: false,
        rules: { ...FOLDER_RULES },
        structure: [
            { name: "*" },
            { children: [], name: "*" },
            ...root,
            { children: [{ name: "{camelCase}.ts" }], name: "scripts" },
            {
                children: [
                    { name: "README.md" },
                    { name: "fixtures.ts" },
                    { children: [{ name: "{PascalCase}.ts" }], name: "(components|pages)" },
                    { children: [{ name: "{camelCase}.ts" }], name: "(data|helpers)" },
                ],
                name: "e2e",
            },
            {
                children: [
                    { name: "(proxy|instrumentation|instrumentation-client).ts" },
                    { children: [], name: "app" },
                    ...src,
                    {
                        children: [
                            { name: "env.ts" },
                            { ruleId: "functionLayer" },
                            { ruleId: "componentLayer" },
                            { children: [{ ruleId: "hookFolder" }], name: "hooks" },
                            {
                                children: [{ name: "{camelCase}.ts" }, ...constants],
                                name: "constants",
                            },
                            { children: [{ name: "{camelCase}.ts" }], name: "types" },
                            { children: [{ name: "{camelCase}.schema.ts" }], name: "schemas" },
                            { children: [{ name: "{camelCase}(.test)?.ts" }], name: "validations" },
                            { children: [{ ruleId: "utilDomain" }], name: "utils" },
                            ...shared,
                        ],
                        name: "shared",
                    },
                    {
                        children: [{ ruleId: "componentLayer" }, ...modules],
                        name: "modules",
                    },
                    {
                        children: [
                            { children: [{ ruleId: "componentLayer" }], name: "_client" },
                            { ruleId: "componentLayer" },
                            { ruleId: "functionLayer" },
                            ...ui,
                        ],
                        name: "ui",
                    },
                ],
                name: "src",
            },
        ],
    })
}

/**
 * Project structure configuration
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

export {
    COMPONENT_SUFFIXES,
    FILE_COMPOSITION,
    FILE_RULES,
    FOLDER_RULES,
    FUNCTION_SUFFIXES,
} from "../plugins/project-structure.js"
