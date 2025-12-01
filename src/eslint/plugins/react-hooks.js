const reactHooks = require("eslint-plugin-react-hooks")

module.exports = {
    plugins: {
        "react-hooks": reactHooks,
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
    },
}
