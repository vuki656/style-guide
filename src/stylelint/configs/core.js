const { stylelint } = require("../plugins/stylelint")
const { stylelintOrder } = require("../plugins/order")

/** @type {import("stylelint").Config} */
module.exports = {
    defaultSeverity: "error",
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    allowEmptyInput: true,
    plugins: ["stylelint-order"],
    rules: {
        ...stylelint.rules,
        ...stylelintOrder.rules,
    },
}
