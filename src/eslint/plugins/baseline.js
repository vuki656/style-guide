import plugin from "eslint-plugin-baseline-js"

/** @type {import("@eslint/config-helpers").Config} */
export const baseline = {
    plugins: {
        "baseline-js": plugin,
    },
    rules: {
        "baseline-js/use-baseline": ["error", { available: "widely" }],
    },
}
