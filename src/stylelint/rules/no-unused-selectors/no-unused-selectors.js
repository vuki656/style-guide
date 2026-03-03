import resolveNestedSelector from "postcss-resolve-nested-selector"
import stylelint from "stylelint"

import {
    DEFAULT_DOCUMENT_TEMPLATES,
    extractClassReferences,
    extractSimpleSelector,
    resolveAllDocuments,
    resolveDocumentPaths,
} from "./no-unused-selectors.utils.js"

const ruleName = "dvukovic/no-unused-selectors"

const messages = stylelint.utils.ruleMessages(ruleName, {
    rejected: (selector) => {
        return `Selector "${selector}" is not used in any document`
    },
})

const meta = {
    fixable: false,
    url: "https://github.com/vuki656/style-guide",
}

function isInsideKeyframes(ruleNode) {
    const parent = ruleNode.parent

    if (parent?.type !== "atrule") {
        return false
    }

    return parent.name === "keyframes"
}

/**
 * @type {import("stylelint").Rule<
 *     boolean,
 *     import("./no-unused-selectors.types.ts").SecondaryOptionsType
 * >}
 */
const ruleFunction = (primaryOption, secondaryOptions) => {
    return (root, result) => {
        const validOptions = stylelint.utils.validateOptions(
            result,
            ruleName,
            {
                actual: primaryOption,
                possible: [true, false],
            },
            {
                actual: secondaryOptions,
                optional: true,
                possible: {
                    documents: [
                        (value) => {
                            return typeof value === "string"
                        },
                    ],
                },
            },
        )

        if (!validOptions || !primaryOption) {
            return
        }

        const cssFilePath = root.source?.input?.file

        if (!cssFilePath) {
            return
        }

        const templates = secondaryOptions?.documents ?? DEFAULT_DOCUMENT_TEMPLATES
        const documentPaths = resolveDocumentPaths(cssFilePath, templates)
        const documents = resolveAllDocuments(documentPaths)

        if (documents.length === 0) {
            return
        }

        const allReferences = new Set()

        for (const document of documents) {
            const documentReferences = extractClassReferences(document.content, document.path)

            for (const reference of documentReferences) {
                allReferences.add(reference)
            }
        }

        root.walkRules((ruleNode) => {
            if (isInsideKeyframes(ruleNode)) {
                return
            }

            const resolvedSelectors = resolveNestedSelector(ruleNode.selector, ruleNode)

            for (const resolvedSelector of resolvedSelectors) {
                const simpleSelector = extractSimpleSelector(resolvedSelector)

                if (!simpleSelector) {
                    continue
                }

                if (allReferences.has(simpleSelector.value)) {
                    continue
                }

                stylelint.utils.report({
                    message: messages.rejected(simpleSelector.value),
                    node: ruleNode,
                    result,
                    ruleName,
                    word: ruleNode.selector,
                })
            }
        })
    }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages
ruleFunction.meta = meta

export default stylelint.createPlugin(ruleName, ruleFunction)
