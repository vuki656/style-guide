const { stylelint } = require("../plugins/stylelint")

/** @type {import("stylelint").Config} */
module.exports = {
    defaultSeverity: "error",
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    allowEmptyInput: true,
    rules: {
        ...stylelint.rules,
    },
}
