import unusedImports from "eslint-plugin-unused-imports"

const plugin = {
    plugins: {
        "unused-imports": unusedImports,
    },
    rules: {
        "unused-imports/no-unused-imports": "error",
    },
}

export default plugin
