export const noInstanceofError = {
    create(context) {
        return {
            BinaryExpression(node) {
                if (
                    node.operator === "instanceof" &&
                    node.right.type === "Identifier" &&
                    node.right.name === "Error"
                ) {
                    context.report({
                        fix(fixer) {
                            const leftText = context.sourceCode.getText(node.left)

                            return fixer.replaceText(node, `Error.isError(${leftText})`)
                        },
                        messageId: "forbidden",
                        node,
                    })
                }
            },
        }
    },
    meta: {
        docs: {
            description:
                "Forbids `instanceof Error` in favor of `Error.isError()` which works across realms.",
        },
        fixable: "code",
        messages: {
            forbidden:
                "Use `Error.isError()` instead of `instanceof Error`. It works across realms where `instanceof` fails.",
        },
        schema: [],
        type: "problem",
    },
}
