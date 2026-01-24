import { fileURLToPath } from "node:url"

const dictionaryPath = fileURLToPath(new URL("../base.txt", import.meta.url))

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
            path: dictionaryPath,
        },
    ],
    ignorePaths: ["TODO.md", "tsconfig.tsbuildinfo", "CHANGELOG.md"],
    useGitignore: true,
}

export default config
