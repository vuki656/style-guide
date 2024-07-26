const { packageJsonCore } = require("../plugins/package-json.js")

/** @type {import("npm-package-json-lint/dist/src/configuration").Config} */
const config = {
    rules: {
        ...packageJsonCore.rules,
    },
}

module.exports = config
