/** @type {import("stylelint").Config} */
const plugin = {
    rules: {
        "order/order": [
            "custom-properties",
            "dollar-variables",
            "at-variables",
            "declarations",
            "rules",
            "at-rules",
            "less-mixins",
        ],
        "order/properties-alphabetical-order": true,
    },
}

export default plugin
