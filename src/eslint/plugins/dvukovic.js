import { noCommentedOutCode } from "../rules/no-commented-out-code/no-commented-out-code.js"
import { noT } from "../rules/no-t/no-t.js"

/** @type {import("@eslint/config-helpers").Config} */
export const dvukovic = {
    plugins: {
        dvukovic: {
            rules: {
                "no-commented-out-code": noCommentedOutCode,
                "no-t": noT,
            },
        },
    },
    rules: {
        "dvukovic/no-commented-out-code": "error",
        "dvukovic/no-t": "error",
    },
}
