import stylelintOrder from "../plugins/order.js"
import stylelint from "../plugins/stylelint.js"
import noUnusedSelectors from "../rules/no-unused-selectors/no-unused-selectors.js"

/** @type {import("stylelint").Config} */
const config = {
    allowEmptyInput: true,
    defaultSeverity: "error",
    plugins: ["stylelint-order", noUnusedSelectors],
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    reportUnscopedDisables: true,
    rules: {
        ...stylelint.rules,
        ...stylelintOrder.rules,
        "dvukovic/no-unused-selectors": true,
    },
}

export default config
