import path from "node:path"

import stylelint from "stylelint"

import plugin from "./no-unused-selectors.js"

const fixturesDirectory = path.join(import.meta.dirname, "fixtures")

const ruleName = "dvukovic/no-unused-selectors"

function createConfig(documents) {
    return {
        plugins: [plugin],
        rules: {
            [ruleName]: [true, { documents }],
        },
    }
}

function fixtureDocuments(subdirectory, filePatterns) {
    return filePatterns.map((pattern) => {
        return path.join(fixturesDirectory, subdirectory, pattern)
    })
}

describe("dvukovic/no-unused-selectors", () => {
    test("reports unused selectors", async () => {
        const result = await stylelint.lint({
            code: ".used { color: red; } .unused { color: blue; }",
            codeFilename: path.join(fixturesDirectory, "basic", "Component.module.css"),
            config: createConfig(fixtureDocuments("basic", ["Component.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(1)
        expect(result.results[0].warnings[0].rule).toBe(ruleName)
        expect(result.results[0].warnings[0].text).toContain(".unused")
    })

    test("reports no violations when all selectors are used", async () => {
        const result = await stylelint.lint({
            code: ".used { color: red; }",
            codeFilename: path.join(fixturesDirectory, "basic", "Component.module.css"),
            config: createConfig(fixtureDocuments("basic", ["Component.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("resolves selectors across multiple documents", async () => {
        const result = await stylelint.lint({
            code: ".base { color: red; } .variant { color: blue; } .large { color: green; }",
            codeFilename: path.join(fixturesDirectory, "multi-document", "Button.module.css"),
            config: createConfig(
                fixtureDocuments("multi-document", ["Button.tsx", "Button.variants.ts"]),
            ),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("reports unused selectors not found in any document", async () => {
        const result = await stylelint.lint({
            code: ".base { color: red; } .variant { color: blue; } .nonexistent { color: green; }",
            codeFilename: path.join(fixturesDirectory, "multi-document", "Button.module.css"),
            config: createConfig(
                fixtureDocuments("multi-document", ["Button.tsx", "Button.variants.ts"]),
            ),
        })

        expect(result.results[0].warnings).toHaveLength(1)
        expect(result.results[0].warnings[0].text).toContain(".nonexistent")
    })

    test("detects CSS module property access (styles.foo)", async () => {
        const result = await stylelint.lint({
            code: ".used { color: red; }",
            codeFilename: path.join(fixturesDirectory, "basic", "Component.module.css"),
            config: createConfig(fixtureDocuments("basic", ["Component.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("detects CSS module bracket access (styles['foo'])", async () => {
        const result = await stylelint.lint({
            code: ".bracket-class { color: red; }",
            codeFilename: path.join(fixturesDirectory, "bracket-access", "Dynamic.module.css"),
            config: createConfig(fixtureDocuments("bracket-access", ["Dynamic.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("detects className string attribute", async () => {
        const result = await stylelint.lint({
            code: ".foo { color: red; } .bar { color: blue; }",
            codeFilename: path.join(fixturesDirectory, "class-name-attribute", "Static.module.css"),
            config: createConfig(fixtureDocuments("class-name-attribute", ["Static.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("detects id attribute", async () => {
        const result = await stylelint.lint({
            code: "#panel { color: red; }",
            codeFilename: path.join(fixturesDirectory, "id-attribute", "Panel.module.css"),
            config: createConfig(fixtureDocuments("id-attribute", ["Panel.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("extracts string arguments from clsx calls", async () => {
        const result = await stylelint.lint({
            code: ".foo { color: red; } .bar { color: blue; }",
            codeFilename: path.join(fixturesDirectory, "utility-libraries", "Widget.module.css"),
            config: createConfig(fixtureDocuments("utility-libraries", ["Widget.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("extracts object keys from clsx calls", async () => {
        const result = await stylelint.lint({
            code: ".foo { color: red; } .bar { color: blue; } .baz { color: green; }",
            codeFilename: path.join(fixturesDirectory, "utility-libraries", "Widget.module.css"),
            config: createConfig(fixtureDocuments("utility-libraries", ["Widget.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("detects CSS module access inside cva calls", async () => {
        const result = await stylelint.lint({
            code: ".cardBase { color: red; } .cardLarge { color: blue; } .cardSmall { color: green; } .header { padding: 10px; }",
            codeFilename: path.join(fixturesDirectory, "cva-pattern", "Card.module.css"),
            config: createConfig(fixtureDocuments("cva-pattern", ["Card.tsx", "Card.variants.ts"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("strips non-structural pseudo-classes and checks the base selector", async () => {
        const result = await stylelint.lint({
            code: ".link:hover { color: red; } .link:focus { outline: none; }",
            codeFilename: path.join(fixturesDirectory, "pseudo-classes", "Link.module.css"),
            config: createConfig(fixtureDocuments("pseudo-classes", ["Link.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("skips structural pseudo-class selectors as compound", async () => {
        const result = await stylelint.lint({
            code: ".item:first-child { color: red; }",
            codeFilename: path.join(fixturesDirectory, "compound-selectors", "Layout.module.css"),
            config: createConfig(fixtureDocuments("compound-selectors", ["Layout.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("skips compound selectors", async () => {
        const result = await stylelint.lint({
            code: ".parent .child { color: red; }",
            codeFilename: path.join(fixturesDirectory, "compound-selectors", "Layout.module.css"),
            config: createConfig(fixtureDocuments("compound-selectors", ["Layout.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("reports no violations when no documents are found", async () => {
        const result = await stylelint.lint({
            code: ".unused { color: red; }",
            codeFilename: path.join(fixturesDirectory, "basic", "Component.module.css"),
            config: createConfig([path.join(fixturesDirectory, "nonexistent", "Missing.tsx")]),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("reports no violations when rule is disabled", async () => {
        const result = await stylelint.lint({
            code: ".unused { color: red; }",
            codeFilename: path.join(fixturesDirectory, "basic", "Component.module.css"),
            config: {
                plugins: [plugin],
                rules: {
                    [ruleName]: false,
                },
            },
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })

    test("skips element selectors", async () => {
        const result = await stylelint.lint({
            code: "div { color: red; } a { color: blue; }",
            codeFilename: path.join(fixturesDirectory, "basic", "Component.module.css"),
            config: createConfig(fixtureDocuments("basic", ["Component.tsx"])),
        })

        expect(result.results[0].warnings).toHaveLength(0)
    })
})
