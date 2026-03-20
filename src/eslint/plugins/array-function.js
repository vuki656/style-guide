import plugin from "eslint-plugin-array-func"

/** @type {import("@eslint/config-helpers").Config} */
export const arrayFunction = {
    plugins: {
        "array-func": plugin,
    },
    rules: {
        "array-func/from-map": "error",
    },
}
