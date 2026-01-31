import { sonarjsAws } from "../plugins/sonarjs-aws.js"

export const awsConfig = [sonarjsAws]

/**
 * AWS infrastructure ESLint configuration for CDK, SST, and AWS SDK
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function aws(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...awsConfig, ...(extendsConfig ?? [])],
        files: files ?? [
            "**/*.js",
            "**/*.cjs",
            "**/*.mjs",
            "**/*.ts",
            "**/*.cts",
            "**/*.mts",
            ...(additionalFiles ?? []),
        ],
        ...rest,
    }
}
