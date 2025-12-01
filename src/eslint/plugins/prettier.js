import eslintPluginPrettier from "eslint-plugin-prettier"

const plugin = {
    plugins: {
        prettier: eslintPluginPrettier,
    },
    rules: {
        "prettier/prettier": "error",
    },
}

export default plugin
