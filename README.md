# Style Guide

## Getting Started

To get the kitchen sink install the required dependencies:

```
yarn add -D eslint@8.57.0 prettier cspell stylelint npm-package-json-lint @dvukovic/style-guide
```

add the following scripts

```json
{
    "scripts": {
        "lint": "yarn lint:prettier && yarn lint:eslint && yarn lint:stylelint && yarn lint:spell && yarn lint:package-json",
        "lint:eslint": "eslint . --cache",
        "lint:fix": "yarn lint:eslint --fix && yarn lint:prettier --write && yarn lint:stylelint --fix && yarn lint:spell && yarn lint:package-json",
        "lint:package-json": "npmPkgJsonLint --configFile ./.packagerc.js .",
        "lint:prettier": "prettier --log-level=warn --check --cache .",
        "lint:spell": "cspell --config ./.cspellrc.js --no-progress --no-summary --unique '**'",
        "lint:stylelint": "stylelint ./**/*.css --cache"
    }
}
```

add the following to `.gitignore`

```
.eslintcache
.stylelintcache
```

### ESLint

Create a `.eslintrc.js` in root with the following:

```javascript
/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    root: true,
    extends: [
        // JS/TS
        require.resolve("@dvukovic/style-guide/src/eslint/configs/core"),
        require.resolve("@dvukovic/style-guide/src/eslint/configs/node"),

        // Libraries
        require.resolve("@dvukovic/style-guide/src/eslint/configs/next"),
        require.resolve("@dvukovic/style-guide/src/eslint/configs/mobx"),
        require.resolve("@dvukovic/style-guide/src/eslint/configs/react"),
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2024,
        project: "./tsconfig.json",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            extends: [require.resolve("@dvukovic/style-guide/src/eslint/configs/typescript")],
        },
        {
            files: ["*.test.ts"],
            extends: [
                require.resolve(
                    "@dvukovic/style-guide/src/eslint/configs/jest",
                    // OR
                    "@dvukovic/style-guide/src/eslint/configs/vitest",
                ),
            ],
        },
        {
            files: ["*.ui.test.ts"],
            extends: [require.resolve("@dvukovic/style-guide/src/eslint/configs/playwright")],
        },
    ],
}
```

If you need graphql config, everything has to be configured trough `overrides`

```javascript
/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    ignorePatterns: ["node_modules"],
    overrides: [
        {
            extends: [
                require.resolve("@dvukovic/style-guide/src/eslint/configs/core"),
                require.resolve("@dvukovic/style-guide/src/eslint/configs/node"),
                require.resolve("@dvukovic/style-guide/src/eslint/configs/mobx"),
                require.resolve("@dvukovic/style-guide/src/eslint/configs/react"),
                require.resolve("@dvukovic/style-guide/src/eslint/configs/next"),
            ],
            files: ["*.js", ".ts", ".*.cjs", "*.tsx"],
        },
        {
            extends: [require.resolve("@dvukovic/style-guide/src/eslint/configs/typescript")],
            files: ["*.ts", "*.tsx"],
        },
        {
            extends: [
                require.resolve("@dvukovic/style-guide/src/eslint/configs/jest"),
                // OR
                require.resolve("@dvukovic/style-guide/src/eslint/configs/vitest"),
            ],
            files: ["*.test.ts", "*.test.js"],
        },
        {
            files: ["*.ui.test.ts"],
            extends: [require.resolve("@dvukovic/style-guide/src/eslint/configs/playwright")],
        },
        {
            extends: [require.resolve("@dvukovic/style-guide/src/graphql/configs/core")],
            files: ["*.graphql"],
            parser: "@graphql-eslint/eslint-plugin",
            parserOptions: {
                project: "./tsconfig.json",
                schema: "./**/*.graphql",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2024,
        project: "./tsconfig.json",
    },
    root: true,
}
```

### Prettier

Create a `.prettierrc.js` in root with the following:

```javascript
/** @type {import("prettier").Config} */
module.exports = {
    ...require("@dvukovic/style-guide/src/prettier/configs/core"),
}
```

### Stylelint

Create a `.stylelintrc.js` in root with the following:

```javascript
/** @type {import("stylelint").Config} */
module.exports = {
    extends: "@dvukovic/style-guide/src/stylelint/configs/core",
}
```

### CSpell

Create a `.cspellrc.js` in root with the following:

```javascript
/** @type {import("cspell").FileSettings} */
module.exports = {
    cache: {
        cacheLocation: "./node_modules/.cache/cspell",
        useCache: true,
    },
    caseSensitive: false,
    dictionaries: ["shared"],
    dictionaryDefinitions: [
        {
            name: "shared",
            path: "./node_modules/@dvukovic/style-guide/src/cspell/base.txt",
        },
    ],
    useGitignore: true,
}
```

### Package Json Lint

Create a `.packagerc.js` in root with the following:

```javascript
/** @type {import("npm-package-json-lint").NpmPackageJsonLint} */
module.exports = {
    extends: "@dvukovic/style-guide/src/package-json/configs/core",
}
```
