const { stylelint } = require("../plugins/stylelint")
const { stylelintOrder } = require("../plugins/order")

/** @type {import("stylelint").Config} */
module.exports = {
    allowEmptyInput: true,
    defaultSeverity: "error",
    plugins: ["stylelint-order"],
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    rules: {
        ...stylelint.rules,
        ...stylelintOrder.rules,
    },
}
