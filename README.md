# @dvukovic/style-guide

Personal style guide with ESLint, Prettier, and other code quality tools.

## Installation

```bash
yarn add -D @dvukovic/style-guide eslint prettier cspell stylelint
```

## ESLint Configuration

### Basic Usage

Create an `eslint.config.js` file in your project root:

```js
import { customDefineConfig, core, typescript } from "@dvukovic/style-guide/eslint"

export default customDefineConfig(["dist/**", "build/**"], [core(), typescript()])
```

### Available Configs

Each config is a factory function that returns ESLint configuration:

- `core()` - Essential rules for all JavaScript/TypeScript projects
- `node()` - Node.js specific rules
- `react()` - React framework rules
- `typescript()` - TypeScript parser and rules
- `typescriptStrict()` - Additional strict TypeScript rules
- `jest()` - Jest testing framework
- `vitest()` - Vitest testing framework
- `playwright()` - Playwright e2e testing
- `mobx()` - MobX state management
- `next()` - Next.js framework
- `storybook()` - Storybook

### Customizing Configs

Each factory function accepts a `config` parameter to extend or override settings:

```js
import { customDefineConfig, core, typescript } from "@dvukovic/style-guide/eslint"

export default customDefineConfig(
    [],
    [
        core(),
        typescript({
            rules: {
                "@typescript-eslint/no-unused-vars": "warn",
            },
        }),
    ],
)
```

### Scripts

Add these scripts to your `package.json`:

```json
{
    "scripts": {
        "lint": "yarn lint:eslint && yarn lint:prettier && yarn lint:stylelint && yarn lint:spell",
        "lint:eslint": "eslint . --cache --concurrency=auto",
        "lint:fix": "yarn lint:eslint --fix && yarn lint:prettier --write && yarn lint:stylelint --fix && yarn lint:spell",
        "lint:prettier": "prettier --check --cache .",
        "lint:spell": "cspell --no-progress --no-summary --unique '**'",
        "lint:stylelint": "stylelint ./**/*.css --cache",
        "test": "vitest run"
    }
}
```

### Complete Example

A full-featured project (this is the actual config used by this package):

```js
import {
    customDefineConfig,
    core,
    node,
    mobx,
    react,
    next,
    typescript,
    typescriptStrict,
    jest,
    vitest,
    playwright,
} from "@dvukovic/style-guide/eslint"

export default customDefineConfig(
    ["node_modules"],
    [
        core(),
        node(),
        mobx(),
        react(),
        next(),
        typescript(),
        typescriptStrict(),
        jest(),
        vitest(),
        playwright(),
    ],
)
```

## Prettier Configuration

```js prettier.config.ts
import type { Config } from "prettier"

import core from "@dvukovic/style-guide/src/prettier/configs/core.js"

const config: Config = {
    ...core,
}

export default config
```

## Stylelint Configuration

```js stylelint.config.js
/** @type {import("stylelint").Config} */
module.exports = {
    extends: "@dvukovic/style-guide/src/stylelint/configs/core",
    allowEmptyInput: true,
}
```

## Cspell Configuration

```cspell.config.js
/** @type {import("cspell").FileSettings} */
module.exports = {
    cache: {
        cacheLocation: "./node_modules/.cache/cspell",
        useCache: true,
    },
    caseSensitive: false,
    ignorePaths: [],
    dictionaries: ["shared"],
    dictionaryDefinitions: [
        {
            name: "shared",
            path: "./node_modules/@dvukovic/style-guide/src/cspell/base.txt",
        },
    ],
    useGitignore: true,
    ignoreWords: [
    ],
}
```

## License

MIT
