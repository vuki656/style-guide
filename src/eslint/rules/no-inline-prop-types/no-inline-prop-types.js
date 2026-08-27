const DEFAULT_DIRECTORIES = ["src/modules", "src/components"]

const FUNCTION_TYPES = new Set([
    "ArrowFunctionExpression",
    "FunctionDeclaration",
    "FunctionExpression",
])

const PARAM_TYPES = new Set(["ArrayPattern", "Identifier", "ObjectPattern", "RestElement"])

const WRAPPER_TYPES = new Set([
    "TSArrayType",
    "TSIntersectionType",
    "TSTypeAnnotation",
    "TSTypeOperator",
    "TSTypeParameterInstantiation",
    "TSTypeReference",
    "TSUnionType",
])

function isInDirectories(filePath, directories) {
    const normalizedPath = filePath.replaceAll("\\", "/")

    return directories.some((directory) => {
        const normalizedDirectory = directory.replaceAll("\\", "/")

        return normalizedPath.includes(`${normalizedDirectory}/`)
    })
}

function findAnnotatedNode(node) {
    let current = node

    while (current.parent && WRAPPER_TYPES.has(current.parent.type)) {
        current = current.parent
    }

    return current.type === "TSTypeAnnotation" ? current.parent : null
}

function isFunctionParam(node) {
    if (!node || !PARAM_TYPES.has(node.type)) {
        return false
    }

    const param = node.parent?.type === "AssignmentPattern" ? node.parent : node
    const owner = param.parent

    return Boolean(owner) && FUNCTION_TYPES.has(owner.type) && owner.params.includes(param)
}

function isVariableAnnotation(node) {
    return node?.type === "Identifier" && node.parent?.type === "VariableDeclarator"
}

export const noInlinePropTypes = {
    create(context) {
        const directories = context.options[0]?.directories ?? DEFAULT_DIRECTORIES

        if (!context.filename.endsWith(".tsx")) {
            return {}
        }

        if (!isInDirectories(context.filename, directories)) {
            return {}
        }

        return {
            TSTypeLiteral(node) {
                const annotated = findAnnotatedNode(node)

                if (!isFunctionParam(annotated) && !isVariableAnnotation(annotated)) {
                    return
                }

                context.report({
                    messageId: "noInlinePropTypes",
                    node,
                })
            },
        }
    },
    meta: {
        docs: {
            description:
                "Requires function parameters and variables in `.tsx` files to use a named type from a sibling `.types.ts` file instead of an inline object type.",
        },
        messages: {
            noInlinePropTypes:
                "Inline object types are not allowed in `.tsx` files. Declare a named type in a sibling `.types.ts` file and use it here.",
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    directories: {
                        default: DEFAULT_DIRECTORIES,
                        items: {
                            type: "string",
                        },
                        type: "array",
                    },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
}
