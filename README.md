# Style Guide

## Getting Started

To get the kitchen sink install the required dependencies:

```
yarn add -D eslint@8.57.0 prettier cspell stylelint npm-package-json-lint
```

add the following scripts

```json
{
    "scripts": {
        "lint": "yarn lint:prettier && yarn lint:eslint && yarn lint:stylelint && yarn lint:spell && yarn lint:package-json",
        "lint:eslint": "eslint . --ext .js,.ts,.tsx --cache",
        "lint:fix": "yarn lint:eslint --fix && yarn lint:prettier --write  && yarn lint:stylelint --fix && yarn lint:spell && yarn lint:package-json",
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
/** @type {import("@types/eslint").ESLint.ConfigData} */
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
            files: ["./**/*.{tsx,ts}"],
            extends: [
                require.resolve(
                    "@dvukovic/style-guide/src/eslint/configs/typescript",
                ),
            ],
        },
        {
            files: ["./**/*.test.ts"],
            extends: [
                require.resolve(
                    "@dvukovic/style-guide/src/eslint/configs/jest",
                ),
            ],
        },
    ],
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
