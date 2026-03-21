---
description: Update all dependencies with deep review of linting plugin changes
---

You are updating dependencies for `@dvukovic/style-guide`, a shared ESLint/Prettier/Stylelint/cspell config package.

## Project context

- ESM-only, Node >=24, ESLint flat config
- ESLint plugin configs: `src/eslint/plugins/*.js`
- Stylelint plugin configs: `src/stylelint/plugins/*.js`
- Custom ESLint rules: `src/eslint/rules/`
- Rules in plugin files must be in alphabetical order (perfectionist enforces this)
- `jsonc-eslint-parser` uses `import * as` (no default export)
- Peer dependencies in `package.json` need widening when major versions of peer deps change (eslint, stylelint, knip, cspell, prettier, typescript)

## Step 1: Discover outdated dependencies

Run `npx -y npm-check-updates` to find all outdated packages. Present the full list to the user.

## Step 2: Categorize

Split every outdated dependency into one of these categories:

**Category A — Safe bumps:** Patch/minor updates to non-linting packages (utilities, type defs, dev tools). These get bumped without further review.

**Category B — Major bumps:** Any package with a major version change. Research the changelog for breaking changes and assess impact on this project.

**Category C — Linting ecosystem:** Any ESLint plugin, Stylelint plugin, Prettier plugin, or cspell update (any semver level). These need deep changelog review for new rules, new rule options, removed/renamed rules, and changed defaults.

A package can be in both B and C (e.g., a major bump of an ESLint plugin).

## Step 3: Research changelogs

Launch up to 3 parallel Explore agents to research changelogs. For each agent, use WebSearch and WebFetch to find GitHub releases or CHANGELOG.md files.

**For Category B (majors):** Find breaking changes, removed APIs, changed defaults. Assess whether each breaking change impacts this project specifically.

**For Category C (linting ecosystem):** Find:
- New rules added (name + what it does)
- New options added to existing rules
- Rules removed or renamed
- Changed default behavior

## Step 4: Present major bumps to user

For each major bump, present:
- What broke / what changed
- Whether it impacts this project (with reasoning)
- Your recommendation (update or skip)

Give the user a detailed breakdown of each before asking for decisions. Do NOT ask the user to approve things they haven't seen explained yet.

## Step 5: Present new linting rules to user

For each linting plugin with new rules or options, present them one at a time or in small groups:
- Rule name and what it does
- Whether it overlaps with existing rules
- Your recommendation

Use AskUserQuestion to collect decisions. Let the user see what each rule does before deciding.

## Step 6: Cross-check large plugins

For any plugin with 50+ rules (sonarjs, unicorn, typescript-eslint), run a script to compare configured rules against available rules:

```javascript
node --input-type=module -e "
import plugin from '<plugin-package>'
import { readFileSync } from 'fs'
const file = readFileSync('<plugin-config-file>', 'utf8')
const configured = new Set([...file.matchAll(/\"<prefix>\/([\w-]+)\"/g)].map(m => m[1]))
const available = Object.keys(plugin.rules)
const removed = [...configured].filter(r => !available.includes(r))
const added = available.filter(r => !configured.has(r)).sort()
console.log('Removed rules:', removed)
console.log('New available rules:', added)
"
```

If any configured rules were removed, fix them before proceeding.

## Step 7: Apply changes

1. Update all approved versions in `package.json`
2. Widen peer dependency ranges if major peer deps changed
3. Run `yarn install`
4. Run `yarn build && yarn test` to catch breakage from version bumps
5. Fix any breakage (removed rules, changed exports, renamed APIs)
6. Add new rules/options the user approved to the appropriate plugin files (in alphabetical order)
7. Run `yarn build && yarn test && yarn lint` for final verification
