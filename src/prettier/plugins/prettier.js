/** @type {import("prettier").Config} */
const prettierPlugin = {
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: "auto",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "css",
    jsxSingleQuote: false,
    printWidth: 80,
    proseWrap: "always",
    quoteProps: "as-needed",
    semi: false,
    singleAttributePerLine: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "all",
    useTabs: false,
}

module.exports = {
    prettierPlugin,
}
