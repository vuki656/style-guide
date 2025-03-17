const { prettierPluginEmbed } = require("../plugins/embed.js")
const { prettierPluginSql } = require("../plugins/sql.js")
const { prettierPlugin } = require("../plugins/prettier.js")

/** @type {import("prettier").Config} */
module.exports = {
    plugins: [
        "@prettier/plugin-xml",
        "prettier-plugin-prisma",
        "prettier-plugin-sql",
        "prettier-plugin-embed",
        "prettier-plugin-jsdoc",
        "prettier-plugin-packagejson",
        "prettier-plugin-sh",
        "prettier-plugin-toml",
        "prettier-plugin-tailwindcss",
    ],
    ...prettierPlugin,
    ...prettierPluginSql,
    ...prettierPluginEmbed,
}
