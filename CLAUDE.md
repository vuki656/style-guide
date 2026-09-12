# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

This is `@dvukovic/style-guide`, a personal style guide package providing shared ESLint, Prettier,
Stylelint, cspell, Knip, jscpd and Lighthouse CI configurations for JavaScript/TypeScript projects.
Published to npm and consumed by other projects.

## Commands

```bash
yarn build       # Generate TypeScript declaration files (dist/)
yarn lint        # Run all linters (eslint, prettier, stylelint, cspell)
yarn lint:eslint # Run ESLint with caching
yarn lint:fix    # Auto-fix all linting issues
yarn test        # Run vitest tests
yarn release     # Publish new version (release-it)
```

Run a single test file:

```bash
yarn vitest run src/eslint/configs/core.test.js
```

## Architecture

### Directory Structure

- `src/eslint/` - ESLint configurations (main export)
    - `configs/` - Factory functions for each config type (core, typescript, react, etc.)
    - `plugins/` - Plugin wrappers that configure individual ESLint plugins
    - `rules/` - Custom ESLint rules (no-commented-out-code, no-t)
- `src/prettier/` - Prettier configuration
- `src/stylelint/` - Stylelint configuration, including the `mantine` overrides
- `src/cspell/` - Spell checking dictionary
- `src/knip/` - Knip configuration
- `src/jscpd/` - jscpd values, written to `.jscpd.json` by the CLI because jscpd reads JSON only
- `src/lighthouse/` - Lighthouse CI configuration, CommonJS because lhci loads its config with
  `require`
- `src/cli/` - `init` and `check-dashes` commands

### ESLint Config Pattern

Configs use a factory function pattern:

```javascript
export const coreConfig = [plugin1, plugin2, ...]  // Raw config array

export function core(config) {                      // Factory function
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}
    return {
        extends: [...coreConfig, ...(extendsConfig ?? [])],
        files: files ?? ["**/*.js", "**/*.ts", ..., ...(additionalFiles ?? [])],
        ...rest,
    }
}
```

Plugins follow a consistent structure:

```javascript
export const pluginName = {
    plugins: { "plugin-name": plugin },
    rules: { "plugin-name/rule": "error" },
}
```

### Config Types

- `core()` - Base rules for all JS/TS projects
- `typescript()` / `typescriptStrict()` - TypeScript parser and rules
- `react()` - React framework rules
- `next()` - Next.js framework rules
- `node()` - Node.js specific rules
- `jest()` / `vitest()` / `playwright()` - Testing frameworks
- `mobx()` - MobX state management
- `storybook()` - Storybook stories
- `tanstackQuery()` - TanStack Query rules
- `turbo()` - Turborepo rules
- `packageJson()` - package.json linting
- `nextIntl()` - Locale aware navigation, carrying the barrel import patterns
- `noBarrels()` - Aggregate and current directory barrel imports

ESLint replaces a rule's options instead of merging them, so anything a project needs to combine
with its own options ships as a spreadable value rather than a config: `RESTRICTED_SYNTAX` and
`NO_BARREL_PATTERNS`.

### Project Structure

`src/eslint/plugins/project-structure.js` holds the data (`FOLDER_RULES`, `FILE_RULES`,
`FILE_COMPOSITION`, `FUNCTION_SUFFIXES`, `COMPONENT_SUFFIXES`) and
`src/eslint/configs/project-structure.js` holds `projectStructure()` and `folderStructure()`. They
have their own export path, `@dvukovic/style-guide/eslint/project-structure`, so projects that do
not use them never load the plugin.

`folderStructure()` returns the shared tree with extra children spliced into the container they were
given for: `root`, `src`, `shared`, `constants`, `modules` and `ui`. A project keeps only the
folders that are actually its own.

### Main Entry Point

`src/eslint/index.js` exports:

- `customDefineConfig({ configs, ignores, defaultIgnores })` - Wrapper for ESLint's defineConfig
- All config factory functions

### Custom ESLint Rules

Located in `src/eslint/rules/`:

- `no-commented-out-code` - Prevents commented-out code blocks
- `no-restricted-dependencies` - Restricts certain package.json dependencies
- `no-t` - Prevents single-letter 't' variable names
- `require-properties` - Requires certain properties in package.json
- `valid-engines-node` - Validates Node.js engine version in package.json

## Testing

Tests use vitest with globals enabled. Each config and major plugin has a corresponding `.test.js`
file. Test pattern: load config, lint sample code, verify results.

## Release Process

Uses release-it with GitHub Actions. On push to master, CI runs lint + test, then release job
publishes to npm with provenance.

## Coding Style

- No code comments in source files
