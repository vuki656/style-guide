export function generateESLintConfig(options) {
    const {
        extras,
        framework,
        includeAws,
        includeNode,
        isMonorepo,
        language,
        strictMode,
        testing,
    } = options

    const imports = ["core", "customDefineConfig"]
    const configs = ["core()"]
    const ignores = ["dist"]

    if (language === "typescript") {
        imports.push("typescript")
        configs.push("typescript()")

        if (strictMode) {
            imports.push("typescriptStrict")
            configs.push("typescriptStrict()")
        }
    }

    if (framework === "react") {
        imports.push("react")
        configs.push("react()")
        ignores.push("build")
    }

    if (framework === "next") {
        imports.push("next")
        configs.push("next()")
        ignores.push("out")
    }

    if (includeNode) {
        imports.push("node")

        if (framework === "next") {
            configs.push('node({ files: ["**/api/**/*.ts", "**/app/api/**/*.ts"] })')
        } else {
            configs.push("node()")
        }
    }

    if (includeAws) {
        imports.push("aws")

        if (framework === "next") {
            configs.push('aws({ files: ["**/api/**/*.ts", "**/app/api/**/*.ts"] })')
        } else {
            configs.push("aws()")
        }
    }

    if (testing.includes("jest")) {
        imports.push("jest")
        configs.push("jest()")
    }

    if (testing.includes("vitest")) {
        imports.push("vitest")
        configs.push("vitest()")
    }

    if (testing.includes("playwright")) {
        imports.push("playwright")
        configs.push("playwright()")
    }

    if (extras.includes("mobx")) {
        imports.push("mobx")
        configs.push("mobx()")
    }

    if (extras.includes("storybook")) {
        imports.push("storybook")
        configs.push("storybook()")
    }

    if (extras.includes("tanstackQuery")) {
        imports.push("tanstackQuery")
        configs.push("tanstackQuery()")
    }

    if (extras.includes("turbo")) {
        imports.push("turbo")
        configs.push("turbo()")
    }

    if (isMonorepo) {
        imports.push("packageJsonWorkspace")
        configs.push("packageJsonWorkspace()")
    } else {
        imports.push("packageJson")
        configs.push("packageJson()")
    }

    const importStatement = `import {\n    ${imports.join(",\n    ")},\n} from "@dvukovic/style-guide/eslint"`

    const configsArray = `[\n        ${configs.join(",\n        ")},\n    ]`
    const ignoresArray = `["${ignores.join('", "')}"]`

    return `${importStatement}

export default customDefineConfig({
    configs: ${configsArray},
    ignores: ${ignoresArray},
})
`
}
