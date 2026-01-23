const DEFAULT_ALLOWED_VERSIONS = ["24"]

/**
 * Extracts the major version number from a node engine string. Handles formats like ">=20",
 * ">=20.0.0", "^20", "20.x", "20", etc.
 *
 * @param {string} engineValue - The engines.node value
 * @returns {string | null} The major version number or null if not parsable
 */
function extractMajorVersion(engineValue) {
    const match = /(\d+)/.exec(engineValue)

    return match?.[1] ?? null
}

export const validEnginesNode = {
    create(context) {
        const options = context.options[0] || {}
        const allowedVersions = options.versions || DEFAULT_ALLOWED_VERSIONS

        return {
            JSONProperty(node) {
                if (node.key.type !== "JSONLiteral" || node.key.value !== "engines") {
                    return
                }

                if (node.value.type !== "JSONObjectExpression") {
                    return
                }

                const nodeEngine = node.value.properties.find((prop) => {
                    return prop.key.type === "JSONLiteral" && prop.key.value === "node"
                })

                if (!nodeEngine) {
                    return
                }

                if (nodeEngine.value.type !== "JSONLiteral") {
                    return
                }

                const engineValue = nodeEngine.value.value

                if (typeof engineValue !== "string") {
                    return
                }

                const majorVersion = extractMajorVersion(engineValue)

                if (!majorVersion || !allowedVersions.includes(majorVersion)) {
                    context.report({
                        data: {
                            allowed: allowedVersions.join(", "),
                            value: engineValue,
                        },
                        messageId: "invalidVersion",
                        node: nodeEngine.value,
                    })
                }
            },
        }
    },
    meta: {
        docs: {
            description: "Restrict engines.node to specific LTS versions.",
        },
        messages: {
            invalidVersion: `Node engine "{{value}}" is not allowed. Use one of the LTS versions: {{allowed}}.`,
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    versions: {
                        description: "List of allowed major Node.js versions",
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
