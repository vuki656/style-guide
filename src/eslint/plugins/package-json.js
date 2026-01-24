import plugin from "eslint-plugin-package-json"
import jsoncParser from "jsonc-eslint-parser"

import { noRestrictedDependencies } from "../rules/no-restricted-dependencies/no-restricted-dependencies.js"
import { requireProperties } from "../rules/require-properties/require-properties.js"
import { validEnginesNode } from "../rules/valid-engines-node/valid-engines-node.js"

/** @type {import("@eslint/config-helpers").Config} */
export const packageJson = {
    languageOptions: {
        parser: jsoncParser,
    },
    plugins: {
        dvukovic: {
            rules: {
                "no-restricted-dependencies": noRestrictedDependencies,
                "require-properties": requireProperties,
                "valid-engines-node": validEnginesNode,
            },
        },
        "package-json": plugin,
    },
    rules: {
        "dvukovic/no-restricted-dependencies": [
            "error",
            {
                packages: [
                    "@types/*",
                    "cspell",
                    "eslint",
                    "lodash",
                    "npm-package-json-lint",
                    "prettier",
                    "ramda",
                    "stylelint",
                    "typeorm",
                ],
            },
        ],
        "dvukovic/require-properties": ["error", { properties: ["volta.node"] }],
        "dvukovic/valid-engines-node": ["error", { versions: ["24"] }],
        "package-json/bin-name-casing": "error",
        "package-json/no-empty-fields": "error",
        "package-json/no-redundant-files": "error",
        "package-json/no-redundant-publishConfig": "error",
        "package-json/order-properties": "error",
        "package-json/repository-shorthand": "error",
        "package-json/require-author": "error",
        "package-json/require-description": "error",
        "package-json/require-engines": "error",
        "package-json/require-license": "error",
        "package-json/require-name": "error",
        "package-json/require-repository": "error",
        "package-json/require-version": "error",
        "package-json/restrict-dependency-ranges": [
            "error",
            {
                forDependencyTypes: ["dependencies", "devDependencies", "optionalDependencies"],
                rangeType: "pin",
            },
        ],
        "package-json/scripts-name-casing": "error",
        "package-json/sort-collections": "error",
        "package-json/specify-peers-locally": "error",
        "package-json/unique-dependencies": "error",
        "package-json/valid-author": "error",
        "package-json/valid-bin": "error",
        "package-json/valid-bundleDependencies": "error",
        "package-json/valid-config": "error",
        "package-json/valid-contributors": "error",
        "package-json/valid-cpu": "error",
        "package-json/valid-dependencies": "error",
        "package-json/valid-description": "error",
        "package-json/valid-devDependencies": "error",
        "package-json/valid-directories": "error",
        "package-json/valid-engines": "error",
        "package-json/valid-exports": "error",
        "package-json/valid-files": "error",
        "package-json/valid-homepage": "error",
        "package-json/valid-keywords": "error",
        "package-json/valid-license": "error",
        "package-json/valid-main": "error",
        "package-json/valid-man": "error",
        "package-json/valid-module": "error",
        "package-json/valid-name": "error",
        "package-json/valid-optionalDependencies": "error",
        "package-json/valid-os": "error",
        "package-json/valid-package-definition": "error",
        "package-json/valid-peerDependencies": "error",
        "package-json/valid-private": "error",
        "package-json/valid-publishConfig": "error",
        "package-json/valid-repository": "error",
        "package-json/valid-repository-directory": "error",
        "package-json/valid-scripts": "error",
        "package-json/valid-sideEffects": "error",
        "package-json/valid-type": "error",
        "package-json/valid-version": "error",
        "package-json/valid-workspaces": "error",
    },
}
