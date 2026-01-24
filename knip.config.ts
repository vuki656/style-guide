import type { KnipConfig } from "knip"

import { core } from "./src/knip/index.js"

const config: KnipConfig = {
    ...core,
    ignore: [],
    ignoreDependencies: [...core.ignoreDependencies],
}

export default config
