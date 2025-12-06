import plugin from "eslint-plugin-sort-keys-fix"

export const sortKeysFix = {
    plugins: {
        "sort-keys-fix": plugin,
    },
    rules: {
        "sort-keys-fix/sort-keys-fix": "error",
    },
}


