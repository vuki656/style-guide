# Style Guide

## Getting Started

To get the kitchen sink install the required dependencies:

```
yarn add -D eslint@^9.0.0 prettier cspell stylelint npm-package-json-lint @dvukovic/style-guide
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

Create a `eslint.config.js` in root with the following:

```javascript
const tseslint = require("typescript-eslint")

const core = require("@dvukovic/style-guide/src/eslint/configs/core")
const node = require("@dvukovic/style-guide/src/eslint/configs/node")
const next = require("@dvukovic/style-guide/src/eslint/configs/next")
const mobx = require("@dvukovic/style-guide/src/eslint/configs/mobx")
const react = require("@dvukovic/style-guide/src/eslint/configs/react")
const typescript = require("@dvukovic/style-guide/src/eslint/configs/typescript")
const jest = require("@dvukovic/style-guide/src/eslint/configs/jest")
const vitest = require("@dvukovic/style-guide/src/eslint/configs/vitest")
const playwright = require("@dvukovic/style-guide/src/eslint/configs/playwright")
const storybook = require("@dvukovic/style-guide/src/eslint/configs/storybook")

module.exports = tseslint.config(
    {
        ignores: ["node_modules", ".next", "dist", "build"],
    },
    ...core,
    ...node,
    ...next,
    ...mobx,
    ...react,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        extends: [...typescript],
    },
    {
        files: ["**/*.test.ts"],
        extends: [...jest],
        // OR
        // extends: [...vitest],
    },
    {
        files: ["**/*.ui.test.ts"],
        extends: [...playwright],
    },
    {
        files: ["**/*.stories.ts", "**/*.stories.tsx"],
        extends: [...storybook],
    },
)
```

If you need graphql config:

```javascript
const tseslint = require("typescript-eslint")
const graphqlEslint = require("@graphql-eslint/eslint-plugin")

const core = require("@dvukovic/style-guide/src/eslint/configs/core")
const node = require("@dvukovic/style-guide/src/eslint/configs/node")
const mobx = require("@dvukovic/style-guide/src/eslint/configs/mobx")
const react = require("@dvukovic/style-guide/src/eslint/configs/react")
const next = require("@dvukovic/style-guide/src/eslint/configs/next")
const typescript = require("@dvukovic/style-guide/src/eslint/configs/typescript")
const jest = require("@dvukovic/style-guide/src/eslint/configs/jest")
const vitest = require("@dvukovic/style-guide/src/eslint/configs/vitest")
const playwright = require("@dvukovic/style-guide/src/eslint/configs/playwright")
const graphql = require("@dvukovic/style-guide/src/graphql/configs/core")

module.exports = tseslint.config(
    {
        ignores: ["node_modules", ".next", "dist", "build"],
    },
    ...core,
    ...node,
    ...mobx,
    ...react,
    ...next,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        extends: [...typescript],
    },
    {
        files: ["**/*.test.ts", "**/*.test.js"],
        extends: [...jest],
        // OR
        // extends: [...vitest],
    },
    {
        files: ["**/*.ui.test.ts"],
        extends: [...playwright],
    },
    {
        files: ["**/*.graphql"],
        extends: [...graphql],
        languageOptions: {
            parser: graphqlEslint,
        },
    },
)
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
