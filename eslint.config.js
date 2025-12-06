import {
    core,
    customDefineConfig,
    jest,
    mobx,
    next,
    node,
    playwright,
    react,
    typescript,
    typescriptStrict,
    vitest,
} from "./src/eslint/index.js"

export default customDefineConfig(
    ["node_modules"],
    [
        core(),
        node(),
        mobx(),
        react(),
        next(),
        typescript(),
        typescriptStrict(),
        jest(),
        vitest(),
        playwright(),
    ],
)
