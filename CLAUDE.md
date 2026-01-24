# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

This is `@dvukovic/style-guide`, a personal style guide package providing shared ESLint, Prettier,
Stylelint, and cspell configurations for JavaScript/TypeScript projects. Published to npm and
consumed by other projects.

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
- `src/stylelint/` - Stylelint configuration
- `src/cspell/` - Spell checking dictionary

### ESLint Config Pattern

Configs use a factory function pattern:

```javascript
export const coreConfig = [plugin1, plugin2, ...]  // Raw config array

export function core(config) {                      // Factory function
    return {
        extends: [...coreConfig, ...(config?.extends ?? [])],
        files: ["**/*.js", "**/*.ts", ...],
        ...config,  // Allow user overrides
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
- `packageJson()` - package.json linting

### Main Entry Point

`src/eslint/index.js` exports:

- `customDefineConfig(ignores, configs)` - Wrapper for ESLint's defineConfig
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
