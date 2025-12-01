import packageJsonCore from "../plugins/package-json.js"

/** @type {import("npm-package-json-lint/dist/src/configuration").Config} */
const config = {
    ...packageJsonCore,
}

export default config
