export function generateCspellConfig() {
    return `import cspellConfig from "@dvukovic/style-guide/cspell"

/** @type {import("cspell").FileSettings} */
const config = {
    ...cspellConfig,
    ignorePaths: [],
    ignoreWords: [],
}

export default config
`
}
