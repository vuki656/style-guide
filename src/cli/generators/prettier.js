export function generatePrettierConfig() {
    return `import type { Config } from "prettier"

import prettierConfig from "@dvukovic/style-guide/prettier"

const config: Config = {
    ...prettierConfig,
}

export default config
`
}
