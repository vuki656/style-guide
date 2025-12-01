import prettierPluginEmbed from "../plugins/embed.js"
import prettierPlugin from "../plugins/prettier.js"
import prettierPluginSql from "../plugins/sql.js"

/** @type {import("prettier").Config} */
const config = {
    plugins: [
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

export default config
