export function generateStylelintConfig() {
    return `import { core } from "@dvukovic/style-guide/stylelint"

/** @type {import("stylelint").Config} */
const config = {
    ...core,
}

export default config
`
}
