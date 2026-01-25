import plugin from "@vitest/eslint-plugin"

/** @type {import("@eslint/config-helpers").Config} */
export const vitest = {
    plugins: {
        "@vitest": plugin,
    },
    rules: {
        "@vitest/consistent-each-for": [
            "error",
            {
                describe: "each",
                it: "for",
                suite: "each",
                test: "for",
            },
        ],
        "@vitest/consistent-test-it": [
            "error",
            {
                fn: "test",
                withinDescribe: "test",
            },
        ],
        "@vitest/expect-expect": [
            "error",
            {
                additionalTestBlockFunctions: [],
                assertFunctionNames: ["expect"],
            },
        ],
        "@vitest/max-expects": ["error", { max: 5 }],
        "@vitest/max-nested-describe": ["error", { max: 2 }],
        "@vitest/no-alias-methods": "error",
        "@vitest/no-commented-out-tests": "error",
        "@vitest/no-conditional-expect": "error",
        "@vitest/no-conditional-in-test": "error",
        "@vitest/no-conditional-tests": "error",
        "@vitest/no-disabled-tests": "error",
        "@vitest/no-duplicate-hooks": "error",
        "@vitest/no-focused-tests": "error",
        "@vitest/no-identical-title": "error",
        "@vitest/no-import-node-test": "error",
        "@vitest/no-importing-vitest-globals": "error",
        "@vitest/no-interpolation-in-snapshots": "error",
        "@vitest/no-large-snapshots": "error",
        "@vitest/no-mocks-import": "error",
        "@vitest/no-standalone-expect": [
            "error",
            {
                additionalTestBlockFunctions: [],
            },
        ],
        "@vitest/no-test-prefixes": "error",
        "@vitest/no-test-return-statement": "error",
        "@vitest/padding-around-all": "error",
        "@vitest/prefer-called-exactly-once-with": "error",
        "@vitest/prefer-called-once": "error",
        "@vitest/prefer-called-with": "error",
        "@vitest/prefer-comparison-matcher": "error",
        "@vitest/prefer-each": "error",
        "@vitest/prefer-equality-matcher": "error",
        "@vitest/prefer-expect-resolves": "error",
        "@vitest/prefer-hooks-in-order": "error",
        "@vitest/prefer-hooks-on-top": "error",
        "@vitest/prefer-lowercase-title": "error",
        "@vitest/prefer-mock-promise-shorthand": "error",
        "@vitest/prefer-spy-on": "error",
        "@vitest/prefer-strict-boolean-matchers": "error",
        "@vitest/prefer-strict-equal": "error",
        "@vitest/prefer-to-be": "error",
        "@vitest/prefer-to-be-object": "error",
        "@vitest/prefer-to-contain": "error",
        "@vitest/prefer-to-have-length": "error",
        "@vitest/prefer-todo": "error",
        "@vitest/prefer-vi-mocked": "error",
        "@vitest/require-awaited-expect-poll": "error",
        "@vitest/require-import-vi-mock": "error",
        "@vitest/require-mock-type-parameters": [
            "error",
            {
                checkImportFunctions: false,
            },
        ],
        "@vitest/require-to-throw-message": "error",
        "@vitest/require-top-level-describe": [
            "error",
            {
                maxNumberOfTopLevelDescribes: 1,
            },
        ],
        "@vitest/valid-describe-callback": "error",
        "@vitest/valid-expect": "error",
        "@vitest/valid-expect-in-promise": "error",
        "@vitest/valid-title": "error",
        "@vitest/vitest/prefer-mock-return-shorthand": "error",
        "@vitest/warn-todo": "warn",
    },
}
