import {
    createFileComposition,
    projectStructureParser,
    projectStructurePlugin,
} from "eslint-plugin-project-structure"

export const FUNCTION_SUFFIXES =
    "(types|constants|utils|errors|validation|data|test|utils.test|properties.test)"

export const COMPONENT_SUFFIXES =
    "(types|constants|utils|data|validation|docx|test|utils.test|validation.test|docx.test|render.test|e2e)"

/** @type {Record<string, object>} */
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

/** @type {Record<string, object>} */
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

export const FILE_COMPOSITION = createFileComposition({
    filesRules: [
        {
            filePattern: [["src/**/*.tsx", "!(src/app/**)"]],
            ...FILE_RULES.componentFile,
        },
        {
            filePattern: ["src/**/*.types.ts", "src/shared/types/*.ts", "src/i18n/*.types.ts"],
            ...FILE_RULES.typeFile,
        },
        {
            filePattern: ["src/**/*.constants.ts", "src/shared/constants/*.ts"],
            ...FILE_RULES.constantsFile,
        },
        {
            filePattern: [
                "src/**/*.utils.ts",
                [
                    "src/shared/{utils,helpers}/**/*.ts",
                    "!(**/*.test.ts)",
                    "!(**/index.ts)",
                    "!(**/*.types.ts)",
                    "!(**/*.constants.ts)",
                ],
            ],
            ...FILE_RULES.utilsFile,
        },
    ],
})

export { projectStructureParser, projectStructurePlugin }
