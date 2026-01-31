import {
    core,
    customDefineConfig,
    node,
    typescript,
    typescriptStrict,
    packageJson,
} from "./src/eslint/index.js"

export default customDefineConfig({
    configs: [
        core(),
        node(),
        typescript(),
        typescriptStrict(),
        packageJson({
            rules: {
                "dvukovic/no-restricted-dependencies": "off",
            },
        }),
    ],
    ignores: ["dist"],
})
