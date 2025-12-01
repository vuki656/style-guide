import importXPlugin from "eslint-plugin-import-x"

const plugin = {
    plugins: {
        "import-x": importXPlugin,
    },
    rules: {
        "import-x/default": "error",
        "import-x/export": "error",
        "import-x/exports-last": "error",
        "import-x/first": "error",
        "import-x/named": "error",
        "import-x/namespace": "error",
        "import-x/newline-after-import": "error",
        "import-x/no-absolute-path": "error",
        "import-x/no-cycle": "error",
        "import-x/no-deprecated": "error",
        "import-x/no-duplicates": "error",
        "import-x/no-dynamic-require": "error",
        "import-x/no-empty-named-blocks": "error",
        "import-x/no-extraneous-dependencies": "error",
        "import-x/no-mutable-exports": "error",
        "import-x/no-named-as-default": "error",
        "import-x/no-named-as-default-member": "error",
        "import-x/no-named-default": "error",
        "import-x/no-relative-packages": "error",
        "import-x/no-self-import": "error",
        "import-x/no-useless-path-segments": "error",
    },
}

export default plugin
