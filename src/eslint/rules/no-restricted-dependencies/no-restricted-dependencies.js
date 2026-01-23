const DEPENDENCY_TYPES = new Set([
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies",
])

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
        const restricted = options.packages || []

        if (restricted.length === 0) {
            return {}
        }

        return {
            JSONProperty(node) {
                if (node.key.type !== "JSONLiteral" || typeof node.key.value !== "string") {
                    return
                }

                const propertyName = node.key.value

                if (!DEPENDENCY_TYPES.has(propertyName)) {
                    return
                }

                if (node.value.type !== "JSONObjectExpression") {
                    return
                }

                for (const dep of node.value.properties) {
                    if (dep.key.type !== "JSONLiteral" || typeof dep.key.value !== "string") {
                        continue
                    }

                    const packageName = dep.key.value

                    for (const pattern of restricted) {
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
                    packages: {
                        description:
                            "List of restricted package names or patterns (supports * wildcard)",
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
