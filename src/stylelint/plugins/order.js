/** @type {import("stylelint").Config} */
const plugin = {
    rules: {
        "order/custom-properties-alphabetical-order": true,
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
