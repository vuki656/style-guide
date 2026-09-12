import { projectStructureParser, projectStructurePlugin } from "eslint-plugin-project-structure"

const FUNCTION_SUFFIXES =
    "(types|constants|utils|errors|validation|data|test|utils.test|properties.test)"

const COMPONENT_SUFFIXES =
    "(types|constants|utils|data|validation|docx|test|utils.test|validation.test|docx.test|render.test|e2e)"

/**
 * Reusable folder rules. Spread them into the `rules` of a
 * `createFolderStructure` call and reference them by `ruleId` in its
 * `structure`, which stays with the project.
 *
 * @type {Record<string, object>}
 */
export const FOLDER_RULES = {
    componentFolder: {
        children: [
            { name: "index.ts" },
            { name: "{FolderName}.(ts|tsx)" },
            { name: `{FolderName}.${COMPONENT_SUFFIXES}.ts` },
            { name: "{FolderName}.module.css" },
            { ruleId: "componentFolder" },
        ],
        name: "{PascalCase}",
    },
    componentLayer: {
        children: [{ ruleId: "componentFolder" }],
        name: "(components|documents|guide|kit|print|og|providers|web)",
    },
    functionFolder: {
        children: [{ name: "index.ts" }, { name: `{folderName}(.${FUNCTION_SUFFIXES})?.ts` }],
        name: "{camelCase}",
    },
    functionLayer: {
        children: [{ ruleId: "functionFolder" }],
        name: "(clients|helpers|docx)",
    },
    hookFolder: {
        children: [{ name: "index.ts" }, { name: `{folderName}(.${FUNCTION_SUFFIXES})?.ts` }],
        name: "use{PascalCase}",
    },
    utilDomain: {
        children: [{ ruleId: "functionFolder" }],
        name: "{camelCase}",
    },
}

const ALL_SELECTORS_SPECIFIED = {
    fileExport: true,
    fileRoot: true,
    nestedSelectors: false,
}

const TYPE_FORMAT = "{PascalCase}(Type|Props)"

/**
 * Reusable file composition rules. Spread one into a `filesRules` entry
 * alongside the `filePattern` that selects the project's files.
 *
 * @type {Record<string, object>}
 */
export const FILE_RULES = {
    componentFile: {
        allowOnlySpecifiedSelectors: ALL_SELECTORS_SPECIFIED,
        rootSelectorsLimits: [{ limit: 1, selector: ["arrowFunction", "function"] }],
        rules: [
            { format: "{FileName}", scope: "fileExport", selector: ["arrowFunction", "function"] },
            { format: "{SNAKE_CASE}", scope: "fileRoot", selector: "variable" },
        ],
    },
    constantsFile: {
        allowOnlySpecifiedSelectors: ALL_SELECTORS_SPECIFIED,
        rules: [
            {
                format: "{SNAKE_CASE}",
                scope: "fileExport",
                selector: ["variable", "variableExpression"],
            },
            {
                format: "{SNAKE_CASE}",
                scope: "fileRoot",
                selector: ["variable", "variableExpression"],
            },
        ],
    },
    typeFile: {
        allowOnlySpecifiedSelectors: ALL_SELECTORS_SPECIFIED,
        rules: [
            { format: TYPE_FORMAT, scope: "fileExport", selector: ["type", "interface"] },
            { format: "{PascalCase}Type", scope: "fileRoot", selector: ["type", "interface"] },
        ],
    },
    utilsFile: {
        rules: [
            { format: "{camelCase}", scope: "fileExport", selector: ["arrowFunction", "function"] },
            { format: "{camelCase}", scope: "fileRoot", selector: ["arrowFunction", "function"] },
            { format: ["{SNAKE_CASE}", "{camelCase}"], scope: "fileRoot", selector: "variable" },
        ],
    },
}

/**
 * Wires the project-structure plugin for a project's own folder structure and
 * file composition configs
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
        fileComposition,
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
