import { baseline } from "./baseline.js"
import { dvukovic } from "./dvukovic.js"
import { eslintComments } from "./eslint-comments.js"
import { eslint } from "./eslint.js"
import { importX } from "./import-x.js"
import { jest } from "./jest.js"
import { mobx } from "./mobx.js"
import { nodeN } from "./n.js"
import { next } from "./next.js"
import { packageJson } from "./package-json.js"
import { perfectionist } from "./perfectionist.js"
import { playwright } from "./playwright.js"
import { promise } from "./promise.js"
import { reactHooks } from "./react-hooks.js"
import { react } from "./react.js"
import { securityNode } from "./security-node.js"
import { sonarjsAws } from "./sonarjs-aws.js"
import { sonarjs } from "./sonarjs.js"
import { storybook } from "./storybook.js"
import { stylistic } from "./stylistic.js"
import { tanstackQuery } from "./tanstack-query.js"
import { turbo } from "./turbo.js"
import { typescriptEslint } from "./typescript-eslint.js"
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
    perfectionist,
    playwright,
    promise,
    react,
    reactHooks,
    securityNode,
    sonarjs,
    sonarjsAws,
    storybook,
    stylistic,
    tanstackQuery,
    turbo,
    typescriptEslint,
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
