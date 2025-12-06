import plugin from "eslint-plugin-sort-destructure-keys"

export const sortDestructureKeys = {
    plugins: {
        "sort-destructure-keys": plugin,
    },
    rules: {
        "sort-destructure-keys/sort-destructure-keys": "error",
    },
}
