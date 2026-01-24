import type { KnipConfig } from "knip"

import { core } from "./src/knip/index.js"

const config: KnipConfig = {
    ...core,
    ignore: [],
    ignoreDependencies: [
        "stylelint-no-unused-selectors",
        "stylelint-order",
        "cspell",
        "eslint",
        "prettier",
        "stylelint",
    ],
}

export default config
