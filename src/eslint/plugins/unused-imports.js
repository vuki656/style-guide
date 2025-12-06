import plugin from "eslint-plugin-unused-imports"

export const unusedImports = {
    plugins: {
        "unused-imports": plugin,
    },
    rules: {
        "unused-imports/no-unused-imports": "error",
    },
}


