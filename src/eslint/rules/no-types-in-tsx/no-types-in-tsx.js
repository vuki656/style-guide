const DEFAULT_DIRECTORIES = ["src/modules", "src/components"]

function isInDirectories(filePath, directories) {
    const normalizedPath = filePath.replaceAll("\\", "/")

    return directories.some((directory) => {
        const normalizedDirectory = directory.replaceAll("\\", "/")

        return normalizedPath.includes(`${normalizedDirectory}/`)
    })
}

export const noTypesInTsx = {
    create(context) {
        const directories = context.options[0]?.directories ?? DEFAULT_DIRECTORIES

        if (!context.filename.endsWith(".tsx")) {
            return {}
        }

        if (!isInDirectories(context.filename, directories)) {
            return {}
        }

        function report(node) {
            context.report({
                messageId: "noTypesInTsx",
                node,
            })
        }

        return {
            TSInterfaceDeclaration: report,
            TSTypeAliasDeclaration: report,
        }
    },
    meta: {
        docs: {
            description:
                "Requires type and interface declarations to live in a sibling `.types.ts` file instead of a `.tsx` file.",
        },
        messages: {
            noTypesInTsx:
                "Type declarations are not allowed in `.tsx` files. Move it to a sibling `.types.ts` file.",
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
