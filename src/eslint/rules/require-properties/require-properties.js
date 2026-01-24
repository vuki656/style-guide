function getPropertyPath(node) {
    const parts = []
    let current = node

    while (current?.type === "JSONProperty") {
        if (current.key.type === "JSONLiteral" && typeof current.key.value === "string") {
            parts.unshift(current.key.value)
        }

        current = current.parent?.parent
    }

    return parts.join(".")
}

export const requireProperties = {
    create(context) {
        const options = context.options[0] || {}
        const properties = options.properties || []

        if (properties.length === 0) {
            return {}
        }

        const foundPaths = new Set()
        let programNode = null

        return {
            JSONExpressionStatement(node) {
                programNode = node
            },

            JSONProperty(node) {
                const path = getPropertyPath(node)

                if (path) {
                    foundPaths.add(path)
                }
            },

            "Program:exit"() {
                for (const property of properties) {
                    if (!foundPaths.has(property)) {
                        context.report({
                            data: { property },
                            messageId: "missingProperty",
                            node: programNode,
                        })
                    }
                }
            },
        }
    },
    meta: {
        docs: {
            description: "Require specified properties in package.json",
        },
        messages: {
            missingProperty: `Missing required property "{{property}}" in package.json.`,
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    properties: {
                        description: "List of required property paths (supports dot notation)",
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
