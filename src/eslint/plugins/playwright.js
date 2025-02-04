/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["playwright"],
    rules: {
        "playwright/expect-expect": "error",
        "playwright/max-expects": ["error", { max: 10 }],
        "playwright/max-nested-describe": ["error", { max: 4 }],
        "playwright/missing-playwright-await": "error",
        "playwright/no-commented-out-tests": "error",
        "playwright/no-conditional-expect": "error",
        "playwright/no-conditional-in-test": "error",
        "playwright/no-duplicate-hooks": "error",
        "playwright/no-element-handle": "error",
        "playwright/no-eval": "error",
        "playwright/no-focused-test": "error",
        "playwright/no-force-option": "error",
        "playwright/no-get-by-title": "error",
        "playwright/no-nested-step": "error",
        "playwright/no-page-pause": "error",
        "playwright/no-skipped-test": "error",
        "playwright/no-slowed-test": "error",
        "playwright/no-standalone-expect": "error",
        "playwright/no-unsafe-references": "error",
        "playwright/no-useless-await": "error",
        "playwright/no-useless-not": "error",
        "playwright/no-wait-for-selector": "error",
        "playwright/no-wait-for-timeout": "error",
        "playwright/prefer-comparison-matcher": "error",
        "playwright/prefer-equality-matcher": "error",
        "playwright/prefer-hooks-in-order": "error",
        "playwright/prefer-hooks-on-top": "error",
        "playwright/prefer-locator": "error",
        "playwright/prefer-lowercase-title": [
            "error",
            {
                ignoreTopLevelDescribe: true,
            },
        ],
        "playwright/prefer-native-locators": "error",
        "playwright/prefer-strict-equal": "error",
        "playwright/prefer-to-be": "error",
        "playwright/prefer-to-contain": "error",
        "playwright/prefer-to-have-count": "error",
        "playwright/prefer-to-have-length": "error",
        "playwright/prefer-web-first-assertions": "error",
        "playwright/require-hook": "error",
        "playwright/require-to-throw-message": "error",
        "playwright/require-top-level-describe": "error",
        "playwright/valid-describe-callback": "error",
        "playwright/valid-expect": "error",
        "playwright/valid-expect-in-promise": "error",
        "playwright/valid-title": "error",
    },
}
