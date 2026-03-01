import { ESLint } from "eslint"

import { noCrossModuleImports } from "./no-cross-module-imports.js"

const RULE_ID = "dvukovic/no-cross-module-imports"

function createEslint(ruleOptions) {
    return new ESLint({
        overrideConfig: [
            {
                files: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.jsx"],
                plugins: {
                    dvukovic: {
                        rules: {
                            "no-cross-module-imports": noCrossModuleImports,
                        },
                    },
                },
                rules: {
                    [RULE_ID]: ruleOptions ? ["error", ruleOptions] : "error",
                },
            },
        ],
        overrideConfigFile: true,
    })
}

const eslint = createEslint()

function getErrors(results) {
    return results[0]?.messages.filter((message) => {
        return message.ruleId === RULE_ID
    })
}

describe(RULE_ID, () => {
    describe("detection", () => {
        test("detects cross-module import via relative path", async () => {
            const code = `import { something } from "../../orders/utils"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects require() cross-module calls", async () => {
            const code = `const utils = require("../../orders/utils")\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.js",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("detects dynamic import() cross-module calls", async () => {
            const code = `const module = import("../../orders/utils")\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.js",
            })

            expect(getErrors(results)).toHaveLength(1)
        })

        test("reports correct module names in error message", async () => {
            const code = `import { something } from "../../orders/utils"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.tsx",
            })

            const errors = getErrors(results)

            expect(errors).toHaveLength(1)
            expect(errors[0].message).toBe(
                'Importing from module "orders" is not allowed inside module "users".',
            )
        })
    })

    describe("non-detection", () => {
        test("allows same-module import", async () => {
            const code = `import { something } from "../utils"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows import targeting outside modules directory", async () => {
            const code = `import { something } from "../../../shared/utils"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows importing from src/shared", async () => {
            const code = `import { something } from "../../../shared/utils"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows importing from src/components", async () => {
            const code = `import { Button } from "../../../components/Button"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows importing from src/lib", async () => {
            const code = `import { api } from "../../../lib/api"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("allows external package imports", async () => {
            const code = `import React from "react"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/modules/users/components/UserList.tsx",
            })

            expect(getErrors(results)).toHaveLength(0)
        })

        test("no error when file is outside modules directory", async () => {
            const code = `import { something } from "../modules/users/utils"\n`

            const results = await eslint.lintText(code, {
                filePath: "src/shared/utils.ts",
            })

            expect(getErrors(results)).toHaveLength(0)
        })
    })

    describe("options", () => {
        test("supports custom modulesDirectory option", async () => {
            const customEslint = createEslint({ modulesDirectory: "app/features" })
            const code = `import { something } from "../../dashboard/utils"\n`

            const results = await customEslint.lintText(code, {
                filePath: "app/features/settings/components/Form.tsx",
            })

            expect(getErrors(results)).toHaveLength(1)
        })
    })
})
