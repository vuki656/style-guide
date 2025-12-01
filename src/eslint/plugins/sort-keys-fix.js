import sortKeysFix from "eslint-plugin-sort-keys-fix"

const plugin = {
    plugins: {
        "sort-keys-fix": sortKeysFix,
    },
    rules: {
        "sort-keys-fix/sort-keys-fix": "error",
    },
}

export default plugin
