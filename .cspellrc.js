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
            path: "./src/cspell/base.txt",
        },
    ],
    ignorePaths: ["./src/cspell/base.txt"],
    ignoreWords: [],
    useGitignore: true,
}

export default config
