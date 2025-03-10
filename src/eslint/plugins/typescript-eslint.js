/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/ban-tslint-comment": "error",
        "@typescript-eslint/class-literal-property-style": "error",
        "@typescript-eslint/consistent-generic-constructors": "error",
        "@typescript-eslint/consistent-indexed-object-style": "error",
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            {
                assertionStyle: "as",
                objectLiteralTypeAssertions: "allow",
            },
        ],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                fixStyle: "inline-type-imports",
                prefer: "type-imports",
            },
        ],
        "@typescript-eslint/default-param-last": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                accessibility: "explicit",
                overrides: {
                    accessors: "explicit",
                    constructors: "no-public",
                    methods: "explicit",
                    parameterProperties: "explicit",
                    properties: "explicit",
                },
            },
        ],
        "@typescript-eslint/max-params": ["error", { max: 3 }],
        "@typescript-eslint/method-signature-style": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                format: ["PascalCase"],
                selector: "typeAlias",
                suffix: ["Type", "Props"],
            },
            {
                format: ["PascalCase"],
                prefix: ["T"],
                selector: "typeParameter",
            },
        ],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-array-delete": "error",
        "@typescript-eslint/no-base-to-string": "error",
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "@typescript-eslint/no-confusing-void-expression": "error",
        "@typescript-eslint/no-deprecated": "error",
        "@typescript-eslint/no-duplicate-enum-values": "error",
        "@typescript-eslint/no-duplicate-type-constituents": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-empty-object-type": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-extra-non-null-assertion": "error",
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-implied-eval": "error",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-invalid-void-type": "error",
        "@typescript-eslint/no-loop-func": "error",
        "@typescript-eslint/no-loss-of-precision": "error",
        "@typescript-eslint/no-meaningless-void-operator": [
            "error",
            {
                checkNever: true,
            },
        ],
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-mixed-enums": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-redundant-type-constituents": "error",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-condition": [
            "error",
            {
                allowConstantLoopConditions: true,
            },
        ],
        "@typescript-eslint/no-unnecessary-parameter-property-assignment": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unnecessary-template-expression": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-unnecessary-type-constraint": "error",
        "@typescript-eslint/no-unnecessary-type-parameters": "error",
        "@typescript-eslint/no-unsafe-function-type": "error",
        "@typescript-eslint/no-unsafe-type-assertion": "off",
        "@typescript-eslint/no-unused-expressions": [
            "error",
            {
                allowTernary: true,
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                args: "all",
                argsIgnorePattern: "^_",
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
                ignoreRestSiblings: true,
                varsIgnorePattern: "^_",
            },
        ],
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-useless-empty-export": "error",
        "@typescript-eslint/no-wrapper-object-types": "error",
        "@typescript-eslint/non-nullable-type-assertion-style": "error",
        "@typescript-eslint/only-throw-error": "error",
        "@typescript-eslint/prefer-as-const": "error",
        "@typescript-eslint/prefer-enum-initializers": "error",
        "@typescript-eslint/prefer-find": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-literal-enum-member": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/prefer-nullish-coalescing": [
            "error",
            {
                ignoreConditionalTests: true,
            },
        ],
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-promise-reject-errors": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/prefer-reduce-type-parameter": "error",
        "@typescript-eslint/prefer-regexp-exec": "error",
        "@typescript-eslint/prefer-return-this-type": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/require-array-sort-compare": "error",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/return-await": "error",
        "@typescript-eslint/switch-exhaustiveness-check": [
            "error",
            {
                allowDefaultCaseForExhaustiveSwitch: true,
                considerDefaultExhaustiveForUnions: true,
                requireDefaultForNonUnion: false,
            },
        ],
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/unified-signatures": "error",
        "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
        "default-param-last": "off",
        "dot-notation": "off",
        "max-params": "off",
        "no-array-constructor": "off",
        "no-empty-function": "off",
        "no-implied-eval": "off",
        "no-loop-func": "off",
        "no-loss-of-precision": "off",
        "no-return-await": "off",
        "no-shadow": "off",
        "no-throw-literal": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
        "no-useless-constructor": "off",
        "prefer-promise-reject-errors": "off",
        "require-await": "off",
    },
}
