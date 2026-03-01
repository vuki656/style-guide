import path from "node:path"

const DEFAULT_MODULES_DIRECTORY = "src/modules"

function getModuleName(filePath, modulesDirectory) {
    const normalizedPath = filePath.replaceAll("\\", "/")
    const normalizedModulesDirectory = modulesDirectory.replaceAll("\\", "/")

    const modulesIndex = normalizedPath.indexOf(`${normalizedModulesDirectory}/`)

    if (modulesIndex === -1) {
        return null
    }

    const afterModules = normalizedPath.slice(modulesIndex + normalizedModulesDirectory.length + 1)

    const moduleName = afterModules.split("/")[0]

    return moduleName ?? null
}

export const noCrossModuleImports = {
    create(context) {
        const modulesDirectory = context.options[0]?.modulesDirectory ?? DEFAULT_MODULES_DIRECTORY

        const currentModule = getModuleName(context.filename, modulesDirectory)

        if (!currentModule) {
            return {}
        }

        function checkImportSource(node, source) {
            if (!source || typeof source !== "string") {
                return
            }

            if (!source.startsWith(".")) {
                return
            }

            const resolvedPath = path.resolve(path.dirname(context.filename), source)
            const targetModule = getModuleName(resolvedPath, modulesDirectory)

            if (!targetModule) {
                return
            }

            if (targetModule !== currentModule) {
                context.report({
                    data: {
                        currentModule,
                        targetModule,
                    },
                    messageId: "noCrossModuleImports",
                    node,
                })
            }
        }

        return {
            CallExpression(node) {
                // eslint-disable-next-line baseline-js/use-baseline -- false positive: AST node property, not Function.arguments
                if (node.callee.name !== "require" || node.arguments.length === 0) {
                    return
                }

                const argument = node.arguments[0] // eslint-disable-line baseline-js/use-baseline -- false positive: AST node property, not Function.arguments

                if (argument.type !== "Literal" || typeof argument.value !== "string") {
                    return
                }

                checkImportSource(node, argument.value)
            },
            ImportDeclaration(node) {
                checkImportSource(node, node.source.value)
            },
            ImportExpression(node) {
                if (node.source.type !== "Literal" || typeof node.source.value !== "string") {
                    return
                }

                checkImportSource(node, node.source.value)
            },
        }
    },
    meta: {
        docs: {
            description:
                "Prevents importing from one module into another inside the modules directory to enforce module isolation.",
        },
        messages: {
            noCrossModuleImports:
                'Importing from module "{{targetModule}}" is not allowed inside module "{{currentModule}}".',
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    modulesDirectory: {
                        default: DEFAULT_MODULES_DIRECTORY,
                        type: "string",
                    },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
}
