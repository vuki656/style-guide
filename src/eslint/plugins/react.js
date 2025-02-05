/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["react"],
    rules: {
        "react/boolean-prop-naming": "error",
        "react/button-has-type": "error",
        "react/checked-requires-onchange-or-readonly": "error",
        "react/destructuring-assignment": "error",
        "react/display-name": "error",
        "react/forward-ref-uses-ref": "error",
        "react/function-component-definition": [
            "error",
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function",
            },
        ],
        "react/hook-use-state": "error",
        "react/iframe-missing-sandbox": "error",
        "react/jsx-boolean-value": ["error", "always"],
        "react/jsx-child-element-spacing": "error",
        "react/jsx-closing-bracket-location": "error",
        "react/jsx-closing-tag-location": "error",
        "react/jsx-curly-brace-presence": [
            "error",
            {
                children: "never",
                props: "never",
            },
        ],
        "react/jsx-filename-extension": "error",
        "react/jsx-filename-extension": [
            "error",
            { allow: "as-needed", extensions: [".tsx", ".jsx"] },
        ],
        "react/jsx-first-prop-new-line": ["error", "multiline"],
        "react/jsx-fragments": "error",
        "react/jsx-key": "error",
        "react/jsx-newline": [
            "error",
            {
                allowMultilines: false,
                prevent: true,
            },
        ],
        "react/jsx-no-comment-textnodes": "error",
        "react/jsx-no-constructed-context-values": "error",
        "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
        "react/jsx-no-script-url": "error",
        "react/jsx-no-target-blank": "error",
        "react/jsx-no-useless-fragment": "error",
        "react/jsx-pascal-case": "error",
        "react/jsx-props-no-spread-multi": "error",
        "react/jsx-sort-props": [
            "error",
            {
                callbacksLast: true,
                multiline: "first",
                reservedFirst: true,
            },
        ],
        "react/no-access-state-in-setstate": "error",
        "react/no-array-index-key": "error",
        "react/no-children-prop": [
            "error",
            {
                allowFunctions: true,
            },
        ],
        "react/no-danger": "error",
        "react/no-deprecated": "error",
        "react/no-did-mount-set-state": "error",
        "react/no-did-update-set-state": "error",
        "react/no-direct-mutation-state": "error",
        "react/no-find-dom-node": "error",
        "react/no-invalid-html-attribute": "error",
        "react/no-is-mounted": "error",
        "react/no-multi-comp": "error",
        "react/no-namespace": "error",
        "react/no-object-type-as-default-prop": "error",
        "react/no-redundant-should-component-update": "error",
        "react/no-render-return-value": "error",
        "react/no-this-in-sfc": "error",
        "react/no-unescaped-entities": "error",
        "react/no-unknown-property": ["error", { ignore: ["global", "jsx"] }],
        "react/no-unsafe": "error",
        "react/no-unused-class-component-methods": "error",
        "react/no-will-update-set-state": "error",
        "react/prefer-es6-class": ["error", "always"],
        "react/prefer-read-only-props": "error",
        "react/self-closing-comp": [
            "error",
            {
                component: true,
                html: true,
            },
        ],
        "react/style-prop-object": "error",
        "react/void-dom-elements-no-children": "error",
    },
}
