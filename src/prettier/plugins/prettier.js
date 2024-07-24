/** @type {import("prettier").Config} */
const prettierPlugin = {
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
}

module.exports = {
    prettierPlugin,
}
