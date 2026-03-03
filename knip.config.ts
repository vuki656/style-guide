import type { KnipConfig } from "knip"

import { core } from "./src/knip/index.js"

const config: KnipConfig = {
    ...core,
    ignore: ["src/stylelint/rules/no-unused-selectors/fixtures/**/*"],
    ignoreFiles: ["scripts/changelog-report.ts", "scripts/changelog-report.types.ts"],
    ignoreDependencies: [
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
