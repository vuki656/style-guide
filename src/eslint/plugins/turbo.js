import plugin from "eslint-plugin-turbo"

/** @type {import("@eslint/config-helpers").Config} */
export const turbo = {
    plugins: {
        turbo: plugin,
    },
    rules: {
        "turbo/no-undeclared-env-vars": "error",
    },
}
