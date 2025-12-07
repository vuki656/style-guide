import typescriptEslint from "typescript-eslint"

export const typescriptStrictConfig = [
    {
        plugins: {
            "@typescript-eslint": typescriptEslint.plugin,
        },
        rules: {
            "@typescript-eslint/no-unsafe-argument": "error",
            "@typescript-eslint/no-unsafe-assignment": "error",
            "@typescript-eslint/no-unsafe-call": "error",
            "@typescript-eslint/no-unsafe-declaration-merging": "error",
            "@typescript-eslint/no-unsafe-enum-comparison": "error",
            "@typescript-eslint/no-unsafe-member-access": "error",
            "@typescript-eslint/no-unsafe-return": "error",
            "@typescript-eslint/no-unsafe-unary-minus": "error",
            "@typescript-eslint/restrict-template-expressions": [
                "error",
                {
                    allowAny: false,
                    allowBoolean: false,
                    allowNever: false,
                    allowNullish: false,
                    allowNumber: true,
                    allowRegExp: false,
                },
            ],
        },
    },
]

/**
 * Strict TypeScript ESLint configuration with additional safety rules
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function typescriptStrict(config) {
    return {
        extends: [...typescriptStrictConfig, ...(config?.extends ?? [])],
        files: ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts"],
        ...config,
    }
}
