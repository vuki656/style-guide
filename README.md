# @dvukovic/style-guide

Personal style guide with ESLint, Prettier, Stylelint, and CSpell configurations.

## Quick Start

```bash
npx -y @dvukovic/style-guide@latest init
```

This interactive CLI will:

- Let you select which tools to configure (ESLint, Prettier, Stylelint, CSpell)
- Ask about your project setup (TypeScript, React/Next.js, testing frameworks)
- Install required dependencies
- Generate configuration files

## Manual Installation

```bash
yarn add -D @dvukovic/style-guide eslint prettier stylelint cspell knip
```

## ESLint

Create `eslint.config.js`:

```js
import { customDefineConfig, core, typescript } from "@dvukovic/style-guide/eslint"

export default customDefineConfig({
    configs: [core(), typescript()],
    ignores: ["dist", "build"],
})
```

### Available Configs

- `core()` - Essential rules for all JavaScript/TypeScript projects
- `typescript()` - TypeScript parser and rules
- `typescriptStrict()` - Additional strict TypeScript rules
- `react()` - React framework rules
- `next()` - Next.js framework
- `node()` - Node.js specific rules
- `jest()` - Jest testing framework
- `vitest()` - Vitest testing framework
- `playwright()` - Playwright e2e testing
- `mobx()` - MobX state management
- `storybook()` - Storybook
- `tanstackQuery()` - TanStack Query
- `turbo()` - Turborepo
- `packageJson()` - package.json linting
- `packageJsonWorkspace()` - package.json linting for monorepos

### Customizing Configs

Each factory function accepts a config parameter to extend or override settings:

```js
import { customDefineConfig, core, typescript } from "@dvukovic/style-guide/eslint"

export default customDefineConfig({
    configs: [
        core(),
        typescript({
            rules: {
                "@typescript-eslint/no-unused-vars": "warn",
            },
        }),
    ],
    ignores: ["dist"],
})
```

## Prettier

Create `prettier.config.ts`:

```ts
import type { Config } from "prettier"

import { core } from "@dvukovic/style-guide/prettier"

const config: Config = {
    ...core,
}

export default config
```

## Stylelint

Create `stylelint.config.js`:

```js
import { core } from "@dvukovic/style-guide/stylelint"

/** @type {import("stylelint").Config} */
const config = {
    ...core,
}

export default config
```

## CSpell

Create `cspell.config.js`:

```js
import { core } from "@dvukovic/style-guide/cspell"

/** @type {import("cspell").FileSettings} */
const config = {
    ...core,
    ignorePaths: [...core.ignorePaths],
    ignoreWords: [],
}

export default config
```

## Knip

Create `knip.config.ts`:

```ts
import type { KnipConfig } from "knip"

import { core } from "@dvukovic/style-guide/knip"

const config: KnipConfig = {
    ...core,
    ignore: [],
    ignoreDependencies: [...core.ignoreDependencies],
}

export default config
```

## Scripts

Add to your `package.json`:

```json
{
    "scripts": {
        "lint": "yarn lint:eslint && yarn lint:prettier && yarn lint:stylelint && yarn lint:cspell && yarn lint:knip",
        "lint:eslint": "eslint . --cache --concurrency=auto",
        "lint:prettier": "prettier --check --cache .",
        "lint:stylelint": "stylelint ./**/*.css --cache",
        "lint:cspell": "cspell --no-progress --no-summary --unique '**'",
        "lint:knip": "knip",
        "lint:fix": "yarn lint:eslint --fix && yarn lint:prettier --write && yarn lint:stylelint --fix"
    }
}
```

## License

MIT
