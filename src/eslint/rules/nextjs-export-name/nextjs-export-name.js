import path from "node:path"

const SPECIAL_FILES = new Map([
    ["page", "Page"],
    ["layout", "Layout"],
    ["loading", "Loading"],
    ["error", "Error"],
    ["not-found", "NotFound"],
    ["template", "Template"],
    ["default", "Default"],
    ["global-error", "GlobalError"],
])

function getExpectedName(filename) {
    const basename = path.basename(filename)
    const nameWithoutExtension = basename.replace(/\.[^.]+$/, "")

    return SPECIAL_FILES.get(nameWithoutExtension) ?? null
}

export const nextjsExportName = {
    create(context) {
        const expectedName = getExpectedName(context.filename)

        if (!expectedName) {
            return {}
        }

        return {
            ExportDefaultDeclaration(node) {
                const declaration = node.declaration

                if (
                    declaration.type === "FunctionDeclaration" ||
                    declaration.type === "ClassDeclaration"
                ) {
                    if (!declaration.id) {
                        context.report({
                            data: { expectedName },
                            messageId: "anonymous",
                            node,
                        })

                        return
                    }

                    if (declaration.id.name !== expectedName) {
                        context.report({
                            data: {
                                actualName: declaration.id.name,
                                expectedName,
                            },
                            fix(fixer) {
                                return fixer.replaceText(declaration.id, expectedName)
                            },
                            messageId: "mismatch",
                            node,
                        })
                    }

                    return
                }

                if (declaration.type === "Identifier") {
                    const scope = context.sourceCode.getScope(node)
                    const variable = scope.set.get(declaration.name)

                    if (!variable) {
                        return
                    }

                    const definition = variable.defs[0]

                    if (!definition) {
                        return
                    }

                    if (declaration.name !== expectedName) {
                        context.report({
                            data: {
                                actualName: declaration.name,
                                expectedName,
                            },
                            fix(fixer) {
                                const replaced = new Set()
                                const fixes = []

                                if (definition.name) {
                                    fixes.push(fixer.replaceText(definition.name, expectedName))
                                    replaced.add(definition.name.range[0])
                                }

                                const unreplacedReferences = variable.references.filter(
                                    (reference) => {
                                        return !replaced.has(reference.identifier.range[0])
                                    },
                                )

                                for (const reference of unreplacedReferences) {
                                    fixes.push(
                                        fixer.replaceText(reference.identifier, expectedName),
                                    )
                                }

                                return fixes
                            },
                            messageId: "mismatch",
                            node,
                        })
                    }
                }
            },
        }
    },
    meta: {
        docs: {
            description:
                "Enforces that default exports in Next.js special files match the expected PascalCase name derived from the filename.",
        },
        fixable: "code",
        messages: {
            anonymous:
                "Default export in this file must be a named function. Expected name: `{{ expectedName }}`.",
            mismatch:
                "Default export `{{ actualName }}` does not match the expected name `{{ expectedName }}` for this file.",
        },
        schema: [],
        type: "problem",
    },
}
