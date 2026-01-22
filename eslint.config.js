import { core, customDefineConfig, node, typescript, typescriptStrict } from "./src/eslint/index.js"

export default customDefineConfig(
    ["node_modules"],
    [core(), node(), typescript(), typescriptStrict()],
)
