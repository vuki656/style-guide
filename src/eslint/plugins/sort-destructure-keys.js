import plugin from "eslint-plugin-sort-destructure-keys"

/** @type {import("@eslint/config-helpers").Config} */
export const sortDestructureKeys = {
    plugins: {
        "sort-destructure-keys": plugin,
    },
    rules: {
        "sort-destructure-keys/sort-destructure-keys": "error",
    },
}
