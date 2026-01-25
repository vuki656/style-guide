import type { KnipConfig } from "knip"

import { core } from "./src/knip/index.js"

const config: KnipConfig = {
    ...core,
    ignore: [],
    ignoreFiles: ["scripts/changelog-report.ts", "scripts/changelog-report.types.ts"],
    ignoreDependencies: [
        "stylelint-no-unused-selectors",
        "stylelint-order",
        "cspell",
        "eslint",
        "prettier",
        "stylelint",
        "semver",
        "@types/semver",
    ],
}

export default config
