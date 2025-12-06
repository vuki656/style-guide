# Style Guide

Linting and formatting configuration for TypeScript/JavaScript projects.

## Installation

```bash
yarn add -D @dvukovic/style-guide eslint prettier cspell stylelint npm-package-json-lint
```

## Setup

Add these scripts to your `package.json`:

```json
{
    "scripts": {
        "lint": "yarn lint:eslint && yarn lint:prettier && yarn lint:stylelint && yarn lint:spell && yarn lint:package-json",
        "lint:eslint": "eslint . --cache --concurrency=auto",
        "lint:fix": "yarn lint:eslint --fix && yarn lint:prettier --write && yarn lint:stylelint --fix",
        "lint:package-json": "npmPkgJsonLint --configFile ./.packagerc.js .",
        "lint:prettier": "prettier --check --cache .",
        "lint:spell": "cspell --config ./.cspellrc.js --no-progress --no-summary --unique '**'",
        "lint:stylelint": "stylelint ./**/*.css --cache"
    }
}
```

Add to `.gitignore`:

```
.eslintcache
.stylelintcache
```

---

## ESLint

Prettier is integrated into ESLint via `eslint-plugin-prettier` for JS/TS files. The separate
`lint:prettier` script handles JSON, YAML, MD, and other files.

Create `eslint.config.js`:

```javascript
import tseslint from "typescript-eslint"

import core from "@dvukovic/style-guide/src/eslint/configs/core.js"
import jest from "@dvukovic/style-guide/src/eslint/configs/jest.js"
import mobx from "@dvukovic/style-guide/src/eslint/configs/mobx.js"
import next from "@dvukovic/style-guide/src/eslint/configs/next.js"
import node from "@dvukovic/style-guide/src/eslint/configs/node.js"
import playwright from "@dvukovic/style-guide/src/eslint/configs/playwright.js"
import react from "@dvukovic/style-guide/src/eslint/configs/react.js"
import storybook from "@dvukovic/style-guide/src/eslint/configs/storybook.js"
import typescript from "@dvukovic/style-guide/src/eslint/configs/typescript.js"
import typescriptStrict from "@dvukovic/style-guide/src/eslint/configs/typescript-strict.js"
import vitest from "@dvukovic/style-guide/src/eslint/configs/vitest.js"

export default tseslint.config(
    { ignores: ["node_modules", ".next", "dist", "build"] },
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
        extends: [...typescript, ...typescriptStrict],
    },
    {
        files: ["**/*.test.ts"],
        extends: [...jest],
    },
    {
        files: ["**/*.test.ts"],
        extends: [...vitest],
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

### Available Configs

| Config              | Description                      |
| ------------------- | -------------------------------- |
| `core`              | Base JavaScript rules + Prettier |
| `node`              | Node.js specific rules           |
| `react`             | React and JSX rules              |
| `next`              | Next.js specific rules           |
| `mobx`              | MobX state management rules      |
| `typescript`        | TypeScript rules                 |
| `typescript-strict` | Strict TypeScript rules          |
| `jest`              | Jest testing rules               |
| `vitest`            | Vitest testing rules             |
| `playwright`        | Playwright E2E testing rules     |
| `storybook`         | Storybook rules                  |

---

## Prettier

Create `prettier.config.js`:

```javascript
import prettierConfig from "@dvukovic/style-guide/src/prettier/configs/core.js"

/** @type {import("prettier").Config} */
export default {
    ...prettierConfig,
}
```

---

## Stylelint

Create `.stylelintrc.js`:

```javascript
/** @type {import("stylelint").Config} */
export default {
    extends: "@dvukovic/style-guide/src/stylelint/configs/core.js",
}
```

---

## CSpell

Create `.cspellrc.js`:

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

---

## Package JSON Lint

Create `.packagerc.js`:

```javascript
/** @type {import("npm-package-json-lint").NpmPackageJsonLint} */
export default {
    extends: "@dvukovic/style-guide/src/package-json/configs/core.js",
}
```

---

## Requirements

- Node.js >= 20.0.0
- ESLint 9+
- Prettier 3+
- Stylelint 16+
