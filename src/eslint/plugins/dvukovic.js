import { documentTodos } from "../rules/document-todos/document-todos.js"
import { noCommentedOutCode } from "../rules/no-commented-out-code/no-commented-out-code.js"
import { noInstanceofError } from "../rules/no-instanceof-error/no-instanceof-error.js"
import { noT } from "../rules/no-t/no-t.js"

/** @type {import("@eslint/config-helpers").Config} */
export const dvukovic = {
    plugins: {
        dvukovic: {
            rules: {
                "document-todos": documentTodos,
                "no-commented-out-code": noCommentedOutCode,
                "no-instanceof-error": noInstanceofError,
                "no-t": noT,
            },
        },
    },
    rules: {
        "dvukovic/document-todos": ["error", { url: "http" }],
        "dvukovic/no-commented-out-code": "error",
        "dvukovic/no-instanceof-error": "error",
        "dvukovic/no-t": "error",
    },
}
