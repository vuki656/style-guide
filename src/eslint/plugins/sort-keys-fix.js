import plugin from "eslint-plugin-sort-keys-fix"

/** @type {import("@eslint/config-helpers").Config} */
export const sortKeysFix = {
    plugins: {
        "sort-keys-fix": plugin,
    },
    rules: {
        "sort-keys-fix/sort-keys-fix": "error",
    },
}
