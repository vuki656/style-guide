export function generatePrettierConfig() {
    return `import type { Config } from "prettier"

import { core } from "@dvukovic/style-guide/prettier"

const config: Config = {
    ...core,
}

export default config
`
}

export function generatePrettierIgnore(options = {}) {
    const lines = ["**/__generated__/**", "**/*.d.json.ts"]

    if (options.isNextJs) {
        lines.push(".next", "public")
    }

    return `${lines.join("\n")}\n`
}
