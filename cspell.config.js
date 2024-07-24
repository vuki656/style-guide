/** @type {import("cspell").FileSettings} */
module.exports = {
    useGitignore: true,
    cache: {
        useCache: true,
        cacheLocation: "./node_modules/.cache/cspell",
    },
    dictionaryDefinitions: [
        {
            name: "shared",
            path: "./src/cspell/base.txt",
        },
    ],
    caseSensitive: false,
    ignorePaths: ["./src/cspell/base.txt"],
    dictionaries: ["shared"],
}
