import { core } from "./src/cspell/index.js"

/** @type {import("cspell").FileSettings} */
const config = {
    ...core,
    ignorePaths: [...core.ignorePaths, "./src/cspell/base.txt"],
    ignoreWords: [],
}

export default config
