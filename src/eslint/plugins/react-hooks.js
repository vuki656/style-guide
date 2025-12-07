import plugin from "eslint-plugin-react-hooks"

/** @type {import("@eslint/config-helpers").Config} */
export const reactHooks = {
    plugins: {
        "react-hooks": plugin,
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
    },
}
