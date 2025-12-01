import stylelintNoUnusedSelectors from "../plugins/no-unused-selectors.js"
import stylelintOrder from "../plugins/order.js"
import stylelint from "../plugins/stylelint.js"

/** @type {import("stylelint").Config} */
const config = {
    allowEmptyInput: true,
    defaultSeverity: "error",
    plugins: ["stylelint-order", "stylelint-no-unused-selectors"],
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    reportUnscopedDisables: true,
    rules: {
        ...stylelint.rules,
        ...stylelintOrder.rules,
        ...stylelintNoUnusedSelectors.rules,
    },
}

export default config
