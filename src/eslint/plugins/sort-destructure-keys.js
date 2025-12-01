import sortDestructureKeys from "eslint-plugin-sort-destructure-keys"

const plugin = {
    plugins: {
        "sort-destructure-keys": sortDestructureKeys,
    },
    rules: {
        "sort-destructure-keys/sort-destructure-keys": "error",
    },
}

export default plugin
