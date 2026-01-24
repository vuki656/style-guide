export function generateCspellConfig() {
    return `import { core } from "@dvukovic/style-guide/cspell"

/** @type {import("cspell").FileSettings} */
const config = {
    ...core,
    ignorePaths: [...core.ignorePaths],
    ignoreWords: [],
}

export default config
`
}
