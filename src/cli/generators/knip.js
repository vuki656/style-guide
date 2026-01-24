export function generateKnipConfig() {
    return `import type { KnipConfig } from "knip"

import { core } from "@dvukovic/style-guide/knip"

const config: KnipConfig = {
    ...core,
    ignore: [],
    ignoreDependencies: [...core.ignoreDependencies],
}

export default config
`
}
