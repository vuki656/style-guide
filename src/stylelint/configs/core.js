const { stylelint } = require("../plugins/stylelint")
const { stylelintOrder } = require("../plugins/order")
const { stylelintNoUnusedSelectors } = require("../plugins/no-unused-selectors")

/** @type {import("stylelint").Config} */
module.exports = {
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
