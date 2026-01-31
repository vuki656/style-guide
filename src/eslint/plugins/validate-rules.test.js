import { baseline } from "./baseline.js"
import { dvukovic } from "./dvukovic.js"
import { eslint } from "./eslint.js"
import { eslintComments } from "./eslint-comments.js"
import { importX } from "./import-x.js"
import { jest } from "./jest.js"
import { mobx } from "./mobx.js"
import { nodeN } from "./n.js"
import { next } from "./next.js"
import { packageJson } from "./package-json.js"
import { playwright } from "./playwright.js"
import { promise } from "./promise.js"
import { react } from "./react.js"
import { reactHooks } from "./react-hooks.js"
import { rimac } from "./rimac.js"
import { securityNode } from "./security-node.js"
import { simpleImportSort } from "./simple-import-sort.js"
import { sonarjs } from "./sonarjs.js"
import { sonarjsAws } from "./sonarjs-aws.js"
import { sortDestructureKeys } from "./sort-destructure-keys.js"
import { sortKeysFix } from "./sort-keys-fix.js"
import { storybook } from "./storybook.js"
import { stylistic } from "./stylistic.js"
import { typescriptEslint } from "./typescript-eslint.js"
import { typescriptSortKeys } from "./typescript-sort-keys.js"
import { unicorn } from "./unicorn.js"
import { unusedImports } from "./unused-imports.js"
import { validatePluginRules } from "./validate-rules.js"
import { vitest } from "./vitest.js"

const allPlugins = {
    baseline,
    dvukovic,
    eslint,
    eslintComments,
    importX,
    jest,
    mobx,
    next,
    nodeN,
    packageJson,
    playwright,
    promise,
    react,
    reactHooks,
    rimac,
    securityNode,
    simpleImportSort,
    sonarjs,
    sonarjsAws,
    sortDestructureKeys,
    sortKeysFix,
    storybook,
    stylistic,
    typescriptEslint,
    typescriptSortKeys,
    unicorn,
    unusedImports,
    vitest,
}

describe("plugin rules", () => {
    for (const [name, config] of Object.entries(allPlugins)) {
        test(`${name} has no invalid rules`, () => {
            validatePluginRules(config)
        })
    }
})
