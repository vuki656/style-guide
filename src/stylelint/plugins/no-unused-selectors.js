/** @type {import("stylelint").Config} */
const plugin = {
    rules: {
        "plugin/no-unused-selectors": [
            true,
            {
                resolve: {
                    documents: [
                        "{cssDir}/{cssName}.variants.ts",
                        "{cssDir}/{cssName}.variants.tsx",
                        "{cssDir}/{cssName}.tsx",
                        "{cssDir}/{cssName}.jsx",
                        "{cssDir}/{cssName}.html",
                        "{cssDir}/{cssName}.htm",
                        "{cssDir}/{cssDirName}.tsx",
                        "{cssDir}/{cssDirName}.jsx",
                        "{cssDir}/{cssDirName}.html",
                        "{cssDir}/{cssDirName}.htm",
                        "{cssDir}/index.tsx",
                        "{cssDir}/index.jsx",
                        "{cssDir}/index.html",
                        "{cssDir}/index.htm",
                    ],
                },
            },
        ],
    },
}

export default plugin
