export function generatePrettierConfig() {
    return `import type { Config } from "prettier"

import { core } from "@dvukovic/style-guide/prettier"

const config: Config = {
    ...core,
}

export default config
`
}
