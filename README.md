# @dvukovic/style-guide

Personal style guide with ESLint, Prettier, Stylelint, CSpell, Knip, jscpd and Lighthouse CI
configurations.

## Quick Start

```bash
npx -y @dvukovic/style-guide@latest init
```

This interactive CLI will:

- Let you select which tools to configure (ESLint, Prettier, Stylelint, CSpell, Knip, jscpd)
- Ask about your project setup (TypeScript, React/Next.js, testing frameworks)
- Install required dependencies
- Generate configuration files

## Manual Installation

```bash
yarn add -D @dvukovic/style-guide eslint prettier stylelint cspell knip jscpd
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
- `nextIntl()` - Locale aware navigation, carrying the barrel import patterns
- `noBarrels()` - Aggregate and current directory barrel imports

Spreadable values for rules whose options ESLint replaces instead of merging:

- `RESTRICTED_SYNTAX` - Enum and wildcard re-export selectors
- `NO_BARREL_PATTERNS` - Barrel import patterns

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

## Project Structure

`@dvukovic/style-guide/eslint/project-structure` wires
[eslint-plugin-project-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure).
File composition is shared, the folder structure is assembled from the shared tree plus the folders
this project adds:

```js
import { folderStructure, projectStructure } from "@dvukovic/style-guide/eslint/project-structure"

export default customDefineConfig({
    configs: [
        projectStructure({
            folderStructure: folderStructure({
                ignorePatterns: ["src/__generated__/**"],
                src: [{ name: "content", children: [{ ruleId: "functionFolder" }] }],
            }),
        }),
        core(),
    ],
})
```

`folderStructure()` takes extra children per container: `root`, `src`, `shared`, `constants`,
`modules` and `ui`. It also exports `FOLDER_RULES`, `FILE_RULES`, `FILE_COMPOSITION`,
`FUNCTION_SUFFIXES` and `COMPONENT_SUFFIXES` for projects that assemble their own.

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

### Mantine

`postcss-preset-mantine` breakpoint variables are not valid media query syntax until postcss expands
them, so the `mantine` config turns that rule off:

```js
import { core, mantine } from "@dvukovic/style-guide/stylelint"

/** @type {import("stylelint").Config} */
const config = {
    ...core,
    rules: {
        ...core.rules,
        ...mantine.rules,
    },
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

## jscpd

jscpd reads JSON only, so `init` writes `.jscpd.json` from the shared config. The same values are
available as `core` from `@dvukovic/style-guide/jscpd`.

## Lighthouse CI

Create `lighthouserc.cjs`:

```js
const { core } = require("@dvukovic/style-guide/lighthouse")

module.exports = core()
```

URLs come from `SEO_LH_URLS`, and `SEO_LH_INP=1` adds the interaction assertion. Both can be passed
as `core({ inp, urls })` instead.

## CLI

```bash
style-guide init         # Generate configuration files
style-guide check-dashes # Find em and en dashes in messages and content
```

`check-dashes` scans `src/i18n/messages` and `src/content`, and exits 1 on a hit.

## Scripts

Add to your `package.json`:

```json
{
    "scripts": {
        "lint": "yarn lint:eslint && yarn lint:prettier && yarn lint:stylelint && yarn lint:cspell && yarn lint:knip && yarn lint:jscpd",
        "lint:eslint": "eslint . --cache --concurrency=auto",
        "lint:prettier": "prettier --check --cache .",
        "lint:stylelint": "stylelint ./**/*.css --cache",
        "lint:cspell": "cspell --no-progress --no-summary --unique '**'",
        "lint:knip": "knip",
        "lint:jscpd": "jscpd",
        "lint:fix": "yarn lint:eslint --fix && yarn lint:prettier --write && yarn lint:stylelint --fix"
    }
}
```

## License

MIT
