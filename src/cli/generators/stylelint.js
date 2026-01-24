export function generateStylelintConfig() {
    return `import stylelintConfig from "@dvukovic/style-guide/stylelint"

/** @type {import("stylelint").Config} */
const config = {
    ...stylelintConfig,
}

export default config
`
}
