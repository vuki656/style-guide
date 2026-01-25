import { sonarjsAws } from "../plugins/sonarjs-aws.js"

export const awsConfig = [sonarjsAws]

/**
 * AWS infrastructure ESLint configuration for CDK, SST, and AWS SDK
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { onlyFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function aws(config) {
    const { extends: extendsConfig, files, onlyFiles, ...rest } = config ?? {}

    return {
        extends: [...awsConfig, ...(extendsConfig ?? [])],
        files: onlyFiles ?? [
            "**/*.js",
            "**/*.cjs",
            "**/*.mjs",
            "**/*.ts",
            "**/*.cts",
            "**/*.mts",
            ...(files ?? []),
        ],
        ...rest,
    }
}
