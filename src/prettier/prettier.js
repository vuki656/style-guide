/** @type {import("prettier-plugin-embed").PrettierPluginEmbedOptions} */
const prettierPluginEmbedConfig = {
    embeddedSqlTags: ["sql"],
}

/** @type {import("prettier-plugin-sql").SqlBaseOptions} */
const prettierPluginSqlConfig = {
    language: "postgresql",
    keywordCase: "upper",
}

/** @type {import("prettier").Config} */
module.exports = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: false,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    proseWrap: "always",
    htmlWhitespaceSensitivity: "css",
    endOfLine: "lf",
    singleAttributePerLine: true,
    embeddedLanguageFormatting: "auto",
    plugins: [
        "@prettier/plugin-xml",
        "prettier-plugin-prisma",
        "prettier-plugin-sql",
        "prettier-plugin-embed",
        "prettier-plugin-jsdoc",
        "prettier-plugin-packagejson",
        "prettier-plugin-sh",
    ],
    ...prettierPluginEmbedConfig,
    ...prettierPluginSqlConfig,
}
