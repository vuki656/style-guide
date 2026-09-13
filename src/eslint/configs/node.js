import { NODE_FILES } from "../file-patterns.js"
import { nodeN } from "../plugins/n.js"
import { securityNode } from "../plugins/security-node.js"

const SCRIPT_FILES = ["scripts/**", "**/scripts/**"]

export const nodeConfig = [
    nodeN,
    securityNode,
    {
        files: SCRIPT_FILES,
        rules: {
            "n/no-process-env": "off",
            "n/no-process-exit": "off",
            "no-console": "off",
            "unicorn/no-process-exit": "off",
        },
    },
]

/**
 * Node.js ESLint configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function node(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...nodeConfig, ...(extendsConfig ?? [])],
        files: files ?? [...NODE_FILES, ...(additionalFiles ?? [])],
        ...rest,
    }
}
