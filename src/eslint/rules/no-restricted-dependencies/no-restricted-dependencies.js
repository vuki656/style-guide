const DEPENDENCY_TYPES = [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies",
]

const DEPENDENCY_TYPES_SET = new Set(DEPENDENCY_TYPES)

/**
 * Checks if a package name matches a restriction pattern. Supports exact matches and glob-like
 * patterns with * wildcard.
 *
 * @param {string} packageName - The package name to check
 * @param {string} pattern - The restriction pattern
 * @returns {boolean} True if the package matches the pattern
 */
function matchesPattern(packageName, pattern) {
    if (pattern.includes("*")) {
        const regexPattern = pattern.replaceAll("*", ".*").replaceAll("/", String.raw`\/`)
        // eslint-disable-next-line security-node/non-literal-reg-expr -- Pattern comes from trusted ESLint config
        const regex = new RegExp(`^${regexPattern}$`)

        return regex.test(packageName)
    }

    return packageName === pattern
}

export const noRestrictedDependencies = {
    create(context) {
        const options = context.options[0] || {}

        return {
            JSONProperty(node) {
                if (node.key.type !== "JSONLiteral" || typeof node.key.value !== "string") {
                    return
                }

                const propertyName = node.key.value

                if (!DEPENDENCY_TYPES_SET.has(propertyName)) {
                    return
                }

                if (node.value.type !== "JSONObjectExpression") {
                    return
                }

                const patterns = options[propertyName] || []

                if (patterns.length === 0) {
                    return
                }

                for (const dep of node.value.properties) {
                    if (dep.key.type !== "JSONLiteral" || typeof dep.key.value !== "string") {
                        continue
                    }

                    const packageName = dep.key.value

                    for (const pattern of patterns) {
                        if (matchesPattern(packageName, pattern)) {
                            context.report({
                                data: {
                                    dependencyType: propertyName,
                                    package: packageName,
                                    pattern,
                                },
                                messageId: "restricted",
                                node: dep.key,
                            })
                            break
                        }
                    }
                }
            },
        }
    },
    meta: {
        docs: {
            description: "Disallow specified packages from being used as dependencies.",
        },
        messages: {
            restricted: `Package "{{package}}" is restricted (matched pattern: "{{pattern}}") in {{dependencyType}}.`,
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    dependencies: {
                        description: "Restricted patterns in dependencies",
                        items: { type: "string" },
                        type: "array",
                    },
                    devDependencies: {
                        description: "Restricted patterns in devDependencies",
                        items: { type: "string" },
                        type: "array",
                    },
                    optionalDependencies: {
                        description: "Restricted patterns in optionalDependencies",
                        items: { type: "string" },
                        type: "array",
                    },
                    peerDependencies: {
                        description: "Restricted patterns in peerDependencies",
                        items: { type: "string" },
                        type: "array",
                    },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
}
