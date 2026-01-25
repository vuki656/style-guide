export const documentTodos = {
    create(context) {
        const url = context.options[0]?.url

        if (!url) {
            throw new Error("URL not set for the document-todos rule. Please set the URL.")
        }

        return {
            Program() {
                const sourceCode = context.sourceCode
                const comments = sourceCode.getAllComments()

                for (const comment of comments) {
                    const isTodo = comment.value.includes("TODO:")
                    const isFixme = comment.value.includes("FIXME:")
                    const hasLink = comment.value.includes(url.toLowerCase())
                    const startsWithTodo = comment.value
                        .trimStart()
                        .toLowerCase()
                        .startsWith("todo")
                    const startsWithFixme = comment.value
                        .trimStart()
                        .toLowerCase()
                        .startsWith("fixme")

                    if ((isTodo || isFixme || startsWithFixme || startsWithTodo) && hasLink) {
                        continue
                    }

                    if (!isTodo && !isFixme && !startsWithFixme && !startsWithTodo) {
                        continue
                    }

                    context.report({
                        loc: comment.loc,
                        messageId: "default",
                    })
                }
            },
        }
    },
    meta: {
        docs: {
            description: "Ensure all TODOs and FIXMEs have an issue link attached to them",
        },
        messages: {
            default: "All TODOs and FIXMEs must have an issue link attached to them",
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    url: {
                        type: "string",
                    },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
}
