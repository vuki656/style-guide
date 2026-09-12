import plugin from "@stylistic/eslint-plugin"

const TRANSLATION_DECLARATION = {
    selector:
        "VariableDeclaration[declarations.length=1][declarations.0.init.type='CallExpression'][declarations.0.init.callee.name='useTranslations']",
}

/** @type {import("@eslint/config-helpers").Config} */
export const stylistic = {
    plugins: {
        "@stylistic": plugin,
    },
    rules: {
        "@stylistic/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                next: "return",
                prev: "*",
            },
            {
                blankLine: "always",
                next: "block",
                prev: "*",
            },
            {
                blankLine: "always",
                next: "*",
                prev: "block",
            },
            {
                blankLine: "always",
                next: "block-like",
                prev: "*",
            },
            {
                blankLine: "always",
                next: "*",
                prev: "block-like",
            },
            {
                blankLine: "always",
                next: ["multiline-const", "multiline-let"],
                prev: "*",
            },
            {
                blankLine: "always",
                next: "*",
                prev: ["multiline-const", "multiline-let"],
            },
            {
                blankLine: "always",
                next: TRANSLATION_DECLARATION,
                prev: "*",
            },
            {
                blankLine: "always",
                next: "*",
                prev: TRANSLATION_DECLARATION,
            },
            {
                blankLine: "never",
                next: { ...TRANSLATION_DECLARATION, lineMode: "singleline" },
                prev: { ...TRANSLATION_DECLARATION, lineMode: "singleline" },
            },
        ],
        "@stylistic/spaced-comment": ["error", "always", { markers: ["/"] }],
    },
}
