import core from "../../jscpd/configs/core.js"

export function generateJscpdConfig() {
    return `${JSON.stringify(core, null, 4)}\n`
}
