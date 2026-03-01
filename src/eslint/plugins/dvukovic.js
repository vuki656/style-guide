import { documentTodos } from "../rules/document-todos/document-todos.js"
import { nextjsExportName } from "../rules/nextjs-export-name/nextjs-export-name.js"
import { noCommentedOutCode } from "../rules/no-commented-out-code/no-commented-out-code.js"
import { noInstanceofError } from "../rules/no-instanceof-error/no-instanceof-error.js"
import { noT } from "../rules/no-t/no-t.js"

const dvukovicPlugin = {
    rules: {
        "document-todos": documentTodos,
        "nextjs-export-name": nextjsExportName,
        "no-commented-out-code": noCommentedOutCode,
        "no-instanceof-error": noInstanceofError,
        "no-t": noT,
    },
}

/** @type {import("@eslint/config-helpers").Config} */
export const dvukovic = {
    plugins: {
        dvukovic: dvukovicPlugin,
    },
    rules: {
        "dvukovic/document-todos": ["error", { url: "http" }],
        "dvukovic/no-commented-out-code": "error",
        "dvukovic/no-instanceof-error": "error",
        "dvukovic/no-t": "error",
    },
}

/** @type {import("@eslint/config-helpers").Config} */
export const dvukovicNextjs = {
    plugins: {
        dvukovic: dvukovicPlugin,
    },
    rules: {
        "dvukovic/nextjs-export-name": "error",
    },
}
