import tseslint from "typescript-eslint"

import {
    hasEmptyBody,
    hasExpressionBody,
    hasLabeledStatementBody,
    isRegionComment,
    toBlocks,
    wrapContent,
} from "./no-commented-out-code.utils.js"

const rule = {
    create(context) {
        const sourceCode = context.sourceCode
        const parserOptions = { ...context.parserOptions, project: undefined }

        function tryParse(content) {
            try {
                const result = tseslint.parser.parseForESLint(content, parserOptions)

                return result.ast
            } catch {
                return null
            }
        }

        return {
            Program() {
                const comments = sourceCode.getAllComments()
                const blocks = toBlocks(comments)

                for (const block of blocks) {
                    const { content, loc } = block

                    if (isRegionComment(content)) {
                        continue
                    }

                    const ast = tryParse(content)

                    if (ast) {
                        if (
                            !hasEmptyBody(ast) &&
                            !hasExpressionBody(ast) &&
                            !hasLabeledStatementBody(ast)
                        ) {
                            context.report({
                                loc,
                                messageId: "forbidden",
                            })
                        }

                        continue
                    }

                    const index = sourceCode.getIndexFromLoc(loc.start)
                    const node = sourceCode.getNodeByRangeIndex(index)
                    const wrappedContent = wrapContent(content, node)

                    if (wrappedContent && tryParse(wrappedContent)) {
                        context.report({
                            loc,
                            messageId: "forbidden",
                        })
                    }
                }
            },
        }
    },
    meta: {
        docs: {
            description: "Forbids commented-out code.",
        },
        messages: {
            forbidden: "Commented-out code is forbidden.",
        },
        schema: [],
        type: "problem",
    },
}

export default rule
