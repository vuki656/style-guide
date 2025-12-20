export const noT = {
    create(context) {
        const [{ prefix = "" } = {}] = context.options

        return {
            "TSTypeParameter > Identifier[name=/^.$/]"(node) {
                context.report({
                    data: { name: node.name },
                    messageId: "forbidden",
                    node,
                })
            },
            "TSTypeParameter > Identifier[name=/^.{2,}$/]"(node) {
                if (prefix && !node.name.startsWith(prefix)) {
                    context.report({
                        data: { name: node.name, prefix },
                        messageId: "prefix",
                        node,
                    })
                }
            },
        }
    },
    meta: {
        docs: {
            description: "Forbids single-character type parameters.",
        },
        messages: {
            forbidden: `Single-character type parameters are forbidden. Choose a more descriptive name for "{{name}}"`,
            prefix: `Type parameter "{{name}}" does not have prefix "{{prefix}}"`,
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    prefix: { type: "string" },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
}
