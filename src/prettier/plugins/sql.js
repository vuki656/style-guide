/** @type {import("prettier-plugin-sql").SqlBaseOptions} */
const prettierPluginSql = {
    keywordCase: "upper",
    language: "postgresql",
}

module.exports = {
    prettierPluginSql,
}
