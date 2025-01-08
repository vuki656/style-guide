/** @type {import("cspell").FileSettings} */
module.exports = {
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
    useGitignore: true,
    ignoreWords: ["networkidle"],
}
