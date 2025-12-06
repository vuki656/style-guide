import { noCommentedOutCode } from "../rules/no-commented-out-code/no-commented-out-code.js"

/** @type {import("@eslint/config-helpers").Config} */
export const dvukovic = {
    plugins: {
        dvukovic: {
            rules: {
                "no-commented-out-code": noCommentedOutCode,
            },
        },
    },
    rules: {
        "dvukovic/no-commented-out-code": "error",
    },
}
