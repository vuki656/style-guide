/** @type {import("cspell").FileSettings} */
const config = {
    cache: {
        cacheLocation: "./node_modules/.cache/cspell",
        useCache: true,
    },
    caseSensitive: false,
    dictionaries: ["shared"],
    dictionaryDefinitions: [
        {
            name: "shared",
            path: "./node_modules/@dvukovic/style-guide/cspell/base.txt",
        },
    ],
    useGitignore: true,
}

export default config
