import { dvukovic } from "./dvukovic.js"
import { unicorn } from "./unicorn.js"

/** @type {import("@eslint/config-helpers").Config} */
export const browserErrors = {
    plugins: {
        ...dvukovic.plugins,
        ...unicorn.plugins,
    },
    rules: {
        "dvukovic/no-instanceof-error": "off",
        "unicorn/prefer-error-is-error": "off",
    },
}
