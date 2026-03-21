import type { KnipConfig } from "knip"

import { core } from "./src/knip/index.js"

const config: KnipConfig = {
    ...core,
    ignore: ["src/stylelint/rules/no-unused-selectors/fixtures/**/*"],
    ignoreFiles: [],
    ignoreDependencies: ["stylelint-order", "semver", "@types/semver", "@typescript-eslint/parser"],
}

export default config
