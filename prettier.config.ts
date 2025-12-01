import type { Config } from "prettier"

import core from "./src/prettier/configs/core.js"

const config: Config = {
    ...core,
}

export default config
