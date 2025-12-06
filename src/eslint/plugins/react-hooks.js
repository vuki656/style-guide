import plugin from "eslint-plugin-react-hooks"

export const reactHooks = {
    plugins: {
        "react-hooks": plugin,
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
    },
}
