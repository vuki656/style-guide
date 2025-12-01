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
import tseslint from "typescript-eslint"

import core from "@dvukovic/style-guide/src/eslint/configs/core.js"
import node from "@dvukovic/style-guide/src/eslint/configs/node.js"
import next from "@dvukovic/style-guide/src/eslint/configs/next.js"
import mobx from "@dvukovic/style-guide/src/eslint/configs/mobx.js"
import react from "@dvukovic/style-guide/src/eslint/configs/react.js"
import typescript from "@dvukovic/style-guide/src/eslint/configs/typescript.js"
import jest from "@dvukovic/style-guide/src/eslint/configs/jest.js"
import vitest from "@dvukovic/style-guide/src/eslint/configs/vitest.js"
import playwright from "@dvukovic/style-guide/src/eslint/configs/playwright.js"
import storybook from "@dvukovic/style-guide/src/eslint/configs/storybook.js"

export default tseslint.config(
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

### Prettier

Create a `.prettierrc.js` in root with the following:

```javascript
import prettierConfig from "@dvukovic/style-guide/src/prettier/configs/core.js"

/** @type {import("prettier").Config} */
export default {
    ...prettierConfig,
}
```

### Stylelint

Create a `.stylelintrc.js` in root with the following:

```javascript
/** @type {import("stylelint").Config} */
export default {
    extends: "@dvukovic/style-guide/src/stylelint/configs/core.js",
}
```

### CSpell

Create a `.cspellrc.js` in root with the following:

```javascript
/** @type {import("cspell").FileSettings} */
export default {
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
export default {
    extends: "@dvukovic/style-guide/src/package-json/configs/core.js",
}
```
