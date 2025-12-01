import rimac from "@rimac-technology/eslint-plugin"

const plugin = {
    plugins: {
        "@rimac-technology": rimac,
    },
    rules: {
        "@rimac-technology/class-element-sorting": "error",
        "@rimac-technology/document-todos": ["error", { url: "http" }],
    },
}

export default plugin
