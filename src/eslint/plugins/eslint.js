/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    rules: {
        "array-callback-return": [
            "error",
            {
                allowImplicit: true,
            },
        ],
        "arrow-body-style": ["error", "always"],
        "block-scoped-var": "error",
        "capitalized-comments": "error",
        "consistent-this": "error",
        curly: ["error", "all"],
        "default-case-last": "error",
        "default-param-last": "error",
        "dot-notation": "error",
        eqeqeq: "error",
        "for-direction": "error",
        "func-name-matching": "error",
        "func-names": ["error", "as-needed"],
        "func-style": ["error", "declaration", { allowArrowFunctions: true }],
        "id-length": ["error", { min: 2 }],
        "logical-assignment-operators": ["error", "never"],
        "max-classes-per-file": ["error", 1],
        "max-depth": ["error", 4],
        "max-lines": ["error", 700],
        "max-params": ["error", 2],
        "no-alert": "error",
        "no-array-constructor": "error",
        "no-async-promise-executor": "error",
        "no-await-in-loop": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": ["error", "always"],
        "no-console": "error",
        "no-constant-binary-expression": "error",
        "no-constant-condition": "error",
        "no-constructor-return": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "error",
        "no-div-regex": "error",

        "no-dupe-else-if": "error",

        "no-duplicate-case": "error",

        "no-else-return": ["error", { allowElseIf: false }],

        "no-empty": "error",

        "no-empty": ["error", { allowEmptyCatch: false }],

        "no-empty-character-class": "error",

        "no-empty-function": ["error", { allow: ["functions"] }],

        "no-empty-pattern": "error",

        "no-empty-static-block": "error",

        "no-eval": "error",

        "no-ex-assign": "error",

        "no-extend-native": "error",

        "no-extra-bind": "error",

        "no-extra-boolean-cast": "error",

        "no-extra-label": "error",

        "no-fallthrough": "error",

        "no-global-assign": "error",

        "no-implicit-coercion": "error",

        "no-implied-eval": "error",

        "no-inline-comments": "error",

        "no-inner-declarations": "error",

        "no-invalid-regexp": "error",

        "no-invalid-this": "error",

        "no-irregular-whitespace": "error",

        "no-iterator": "error",

        "no-label-var": "error",

        "no-labels": "error",

        "no-lone-blocks": "error",

        "no-lonely-if": "error",

        "no-loop-func": "error",

        "no-loss-of-precision": "error",

        "no-misleading-character-class": "error",

        "no-multi-assign": "error",

        "no-multi-str": "error",

        "no-nested-ternary": "error",

        "no-new": "error",

        "no-new-func": "error",

        "no-new-native-nonconstructor": "error",

        "no-new-wrappers": "error",

        "no-nonoctal-decimal-escape": "error",

        "no-object-constructor": "error",

        "no-octal": "error",

        "no-octal-escape": "error",

        "no-param-reassign": "error",

        "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],

        "no-promise-executor-return": "error",

        "no-proto": "error",

        "no-prototype-builtins": "error",

        "no-regex-spaces": "error",

        "no-return-assign": "error",

        "no-script-url": "error",

        "no-self-assign": "error",

        "no-self-compare": "error",

        "no-sequences": "error",

        "no-shadow": "error",

        "no-shadow-restricted-names": "error",

        "no-sparse-arrays": "error",

        "no-template-curly-in-string": "error",

        "no-throw-literal": "error",

        "no-unexpected-multiline": "error",

        "no-unmodified-loop-condition": "error",

        "no-unneeded-ternary": "error",

        "no-unreachable-loop": "error",

        "no-unsafe-finally": "error",

        "no-unsafe-optional-chaining": "error",

        "no-unused-expressions": "error",

        "no-unused-labels": "error",

        "no-unused-private-class-members": "error",

        "no-unused-vars": "error",

        "no-use-before-define": "error",
        // "no-useless-assignment": "error", NOTE: available in eslint 9
        "no-useless-backreference": "error",
        "no-useless-call": "error",
        "no-useless-catch": "error",
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-constructor": "error",
        "no-useless-escape": "error",
        "no-useless-rename": "error",
        "no-useless-return": "error",
        "no-var": "error",
        "no-with": "error",
        "object-shorthand": ["error", "always"],
        "one-var": ["error", "never"],
        "operator-assignment": ["error", "never"],
        "prefer-arrow-callback": [
            "error",
            {
                allowNamedFunctions: true,
            },
        ],
        "prefer-const": "error",
        "prefer-object-has-own": "error",
        "prefer-object-spread": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        radix: "error",
        "require-atomic-updates": "error",
        "require-await": "error",
        "require-yield": "error",
        "symbol-description": "error",
        "use-isnan": "error",
        yoda: "error",
    },
}
