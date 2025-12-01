import reactHooks from "eslint-plugin-react-hooks"

const plugin = {
    plugins: {
        "react-hooks": reactHooks,
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
    },
}

export default plugin
