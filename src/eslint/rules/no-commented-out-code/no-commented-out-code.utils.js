export function isExpressionOrIdentifierOrLiteral(node) {
    if (node.type === "Identifier") {
        return true
    }

    if (node.type === "Literal") {
        return true
    }

    if (node.type === "BinaryExpression") {
        return (
            isExpressionOrIdentifierOrLiteral(node.left) &&
            isExpressionOrIdentifierOrLiteral(node.right)
        )
    }

    return false
}

export function hasEmptyBody(program) {
    return program.type === "Program" && program.body.length === 0
}

export function hasExpressionBody(program) {
    return (
        program.type === "Program" &&
        program.body.every((statement) => {
            return (
                statement.type === "ExpressionStatement" &&
                isExpressionOrIdentifierOrLiteral(statement.expression)
            )
        })
    )
}

export function hasLabeledStatementBody(program) {
    return (
        program.type === "Program" &&
        program.body.length === 1 &&
        program.body[0].type === "LabeledStatement"
    )
}

export function isRegionComment(content) {
    return /\s*#(end)?region/.test(content)
}

export function toBlocks(comments) {
    const blocks = []
    let prevLine

    for (const comment of comments) {
        if (comment.type === "Block") {
            blocks.push({
                content: comment.value.replace(/^\s*\*/, "").replaceAll(/\n\s*\*/g, "\n"),
                loc: { ...comment.loc },
            })
            prevLine = undefined
        } else if (comment.type === "Line") {
            if (prevLine && prevLine.loc.start.line === comment.loc.start.line - 1) {
                const prevBlock = blocks.at(-1)
                prevBlock.content = `${prevBlock.content}\n${comment.value}`
                prevBlock.loc.end = comment.loc.end
            } else {
                blocks.push({
                    content: comment.value,
                    loc: { ...comment.loc },
                })
            }

            prevLine = comment
        }
    }

    return blocks
}

export function wrapContent(content, node) {
    switch (node?.type) {
        case "ArrayExpression": {
            return `let wrapper = [${content}]`
        }

        case "ClassBody": {
            return `class Wrapper { ${content} }`
        }

        case "ImportDeclaration": {
            return `import { ${content} } from "wrapper"`
        }

        case "ObjectExpression": {
            return `let wrapper = { ${content} }`
        }

        case "FunctionDeclaration": {
            return `function wrapper(${content}) {}`
        }

        case "SwitchStatement": {
            return `switch (wrapper) { ${content} }`
        }

        case "TSInterfaceBody": {
            return `interface Wrapper { ${content} }`
        }

        case "TSTypeLiteral": {
            return `type Wrapper = { ${content} }`
        }

        default:
    }
}
