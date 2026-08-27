const WRAPPER_NAMES = new Set(["forwardRef", "memo", "observer"])

const PROPS_NAME = "props"

function isComponentName(name) {
    return typeof name === "string" && /^[A-Z]/.test(name)
}

function getCalleeName(callee) {
    if (callee.type === "Identifier") {
        return callee.name
    }

    if (callee.type === "MemberExpression" && callee.property.type === "Identifier") {
        return callee.property.name
    }

    return null
}

function isComponent(node) {
    if (node.type === "FunctionDeclaration") {
        return isComponentName(node.id?.name)
    }

    let current = node

    while (current.parent?.type === "CallExpression") {
        const callee = getCalleeName(current.parent.callee)

        if (!callee || !WRAPPER_NAMES.has(callee)) {
            return false
        }

        current = current.parent
    }

    const declarator = current.parent

    return (
        declarator?.type === "VariableDeclarator" &&
        declarator.id.type === "Identifier" &&
        isComponentName(declarator.id.name)
    )
}

function getPatternParam(param) {
    if (param.type === "ObjectPattern") {
        return { pattern: param, target: param }
    }

    if (param.type === "AssignmentPattern" && param.left.type === "ObjectPattern") {
        return { pattern: param.left, target: param.left }
    }

    return null
}

function createFix(context, node, pattern) {
    const { sourceCode } = context
    const functionText = sourceCode.getText(node)

    if (/\bprops\b/.test(functionText)) {
        return null
    }

    return (fixer) => {
        const patternText = sourceCode.getText(pattern)
        const patternWithoutType = pattern.typeAnnotation
            ? patternText.slice(0, pattern.typeAnnotation.range[0] - pattern.range[0])
            : patternText
        const typeText = pattern.typeAnnotation ? sourceCode.getText(pattern.typeAnnotation) : ""
        const declaration = `const ${patternWithoutType} = ${PROPS_NAME}`

        if (node.body.type === "BlockStatement") {
            return [
                fixer.replaceText(pattern, `${PROPS_NAME}${typeText}`),
                fixer.insertTextAfterRange(
                    [node.body.range[0], node.body.range[0] + 1],
                    `\n${declaration}\n`,
                ),
            ]
        }

        const bodyText = sourceCode.getText(node.body)

        return [
            fixer.replaceText(pattern, `${PROPS_NAME}${typeText}`),
            fixer.replaceText(node.body, `{\n${declaration}\n\nreturn ${bodyText}\n}`),
        ]
    }
}

export const destructurePropsInBody = {
    create(context) {
        if (!context.filename.endsWith(".tsx")) {
            return {}
        }

        function check(node) {
            const [firstParam] = node.params

            if (!firstParam || !isComponent(node)) {
                return
            }

            const match = getPatternParam(firstParam)

            if (!match) {
                return
            }

            context.report({
                fix: createFix(context, node, match.pattern),
                messageId: "destructurePropsInBody",
                node: match.target,
            })
        }

        return {
            ArrowFunctionExpression: check,
            FunctionDeclaration: check,
            FunctionExpression: check,
        }
    },
    meta: {
        docs: {
            description:
                "Requires component props to be received as a single `props` parameter and destructured in the function body.",
        },
        fixable: "code",
        messages: {
            destructurePropsInBody:
                "Do not destructure props in the component signature. Accept `props` and destructure it in the body.",
        },
        schema: [],
        type: "suggestion",
    },
}
