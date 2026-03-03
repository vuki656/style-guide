import fs from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"

import selectorParser from "postcss-selector-parser"

const require = createRequire(import.meta.url)

let typescriptModule = null

function getTypeScript() {
    if (typescriptModule) {
        return typescriptModule
    }

    try {
        typescriptModule = require("typescript")
    } catch {
        return null
    }

    return typescriptModule
}

const NON_STRUCTURAL_PSEUDO_CLASSES = new Set([
    "active",
    "any-link",
    "autofill",
    "checked",
    "default",
    "defined",
    "disabled",
    "enabled",
    "focus",
    "focus-visible",
    "focus-within",
    "fullscreen",
    "hover",
    "in-range",
    "indeterminate",
    "invalid",
    "link",
    "modal",
    "optional",
    "out-of-range",
    "placeholder-shown",
    "read-only",
    "read-write",
    "required",
    "target",
    "valid",
    "visited",
])

const NON_STRUCTURAL_PSEUDO_ELEMENTS = new Set([
    "after",
    "backdrop",
    "before",
    "cue",
    "file-selector-button",
    "first-letter",
    "first-line",
    "marker",
    "placeholder",
    "selection",
])

const UTILITY_LIBRARY_IMPORTS = new Set(["class-variance-authority", "classnames", "clsx"])

const UTILITY_FUNCTION_NAMES = new Set(["cn", "classnames", "clsx", "cva", "cx"])

const DEFAULT_DOCUMENT_TEMPLATES = [
    "{cssDirectory}/{cssBaseName}.variants.ts",
    "{cssDirectory}/{cssBaseName}.variants.tsx",
    "{cssDirectory}/{cssBaseName}.tsx",
    "{cssDirectory}/{cssBaseName}.jsx",
    "{cssDirectory}/{cssDirectoryName}.tsx",
    "{cssDirectory}/{cssDirectoryName}.jsx",
    "{cssDirectory}/index.tsx",
    "{cssDirectory}/index.jsx",
]

function addClassReference(references, name) {
    references.add(`.${name}`)
}

function addClassReferencesFromString(references, text) {
    const classNames = text.split(/\s+/).filter(Boolean)

    for (const className of classNames) {
        addClassReference(references, className)
    }
}

function getCallArguments(callExpression) {
    return [...callExpression.arguments] // eslint-disable-line baseline-js/use-baseline -- TS AST node property, not Function.arguments
}

function collectCssModuleImports(node, cssModuleIdentifiers) {
    const ts = typescriptModule

    if (!ts.isImportDeclaration(node)) {
        return
    }

    const moduleSpecifier = node.moduleSpecifier

    if (!ts.isStringLiteral(moduleSpecifier)) {
        return
    }

    if (!moduleSpecifier.text.endsWith(".module.css")) {
        return
    }

    const importClause = node.importClause

    if (!importClause?.name) {
        return
    }

    cssModuleIdentifiers.add(importClause.name.text)
}

function collectUtilityImports(node, utilityFunctionIdentifiers) {
    const ts = typescriptModule

    if (!ts.isImportDeclaration(node)) {
        return
    }

    const moduleSpecifier = node.moduleSpecifier

    if (!ts.isStringLiteral(moduleSpecifier)) {
        return
    }

    const source = moduleSpecifier.text
    const isKnownLibrary = UTILITY_LIBRARY_IMPORTS.has(source)
    const importClause = node.importClause

    if (!importClause) {
        return
    }

    if (isKnownLibrary && importClause.name) {
        utilityFunctionIdentifiers.add(importClause.name.text)
    }

    const namedBindings = importClause.namedBindings

    if (!namedBindings || !ts.isNamedImports(namedBindings)) {
        return
    }

    for (const specifier of namedBindings.elements) {
        const localName = specifier.name.text
        const importedName = specifier.propertyName?.text ?? localName

        if (isKnownLibrary && UTILITY_FUNCTION_NAMES.has(importedName)) {
            utilityFunctionIdentifiers.add(localName)
        }

        if (!isKnownLibrary && UTILITY_FUNCTION_NAMES.has(localName)) {
            utilityFunctionIdentifiers.add(localName)
        }
    }
}

function collectPropertyAccessReferences(node, context) {
    const ts = typescriptModule

    if (!ts.isPropertyAccessExpression(node)) {
        return
    }

    const expression = node.expression

    if (!ts.isIdentifier(expression)) {
        return
    }

    if (!context.cssModuleIdentifiers.has(expression.text)) {
        return
    }

    addClassReference(context.references, node.name.text)
}

function collectBracketAccessReferences(node, context) {
    const ts = typescriptModule

    if (!ts.isElementAccessExpression(node)) {
        return
    }

    const expression = node.expression

    if (!ts.isIdentifier(expression)) {
        return
    }

    if (!context.cssModuleIdentifiers.has(expression.text)) {
        return
    }

    const argument = node.argumentExpression

    if (!ts.isStringLiteral(argument)) {
        return
    }

    addClassReference(context.references, argument.text)
}

function collectClassNameAttributes(node, references) {
    const ts = typescriptModule

    if (!ts.isJsxAttribute(node)) {
        return
    }

    if (node.name.text !== "className") {
        return
    }

    const initializer = node.initializer

    if (!initializer || !ts.isStringLiteral(initializer)) {
        return
    }

    addClassReferencesFromString(references, initializer.text)
}

function collectIdAttributes(node, references) {
    const ts = typescriptModule

    if (!ts.isJsxAttribute(node)) {
        return
    }

    if (node.name.text !== "id") {
        return
    }

    const initializer = node.initializer

    if (!initializer || !ts.isStringLiteral(initializer)) {
        return
    }

    references.add(`#${initializer.text}`)
}

function collectUtilityCallReferences(node, context) {
    const ts = typescriptModule

    if (!ts.isCallExpression(node)) {
        return
    }

    const callee = node.expression
    let functionName = null

    if (ts.isIdentifier(callee)) {
        functionName = callee.text
    }

    if (!functionName || !context.utilityFunctionIdentifiers.has(functionName)) {
        return
    }

    // eslint-disable-next-line no-use-before-define -- mutual recursion with extractStringLiteralsFromNodes
    extractStringLiteralsFromNodes(getCallArguments(node), context.references)
}

function extractObjectPropertyReferences(property, references) {
    const ts = typescriptModule

    if (!ts.isPropertyAssignment(property)) {
        return
    }

    const key = property.name

    if (ts.isStringLiteral(key)) {
        addClassReferencesFromString(references, key.text)
    }

    if (ts.isIdentifier(key)) {
        addClassReference(references, key.text)
    }

    // eslint-disable-next-line no-use-before-define -- mutual recursion with extractStringLiteralsFromNodes
    extractStringLiteralsFromNodes([property.initializer], references)
}

function extractStringLiteralsFromNodes(nodes, references) {
    const ts = typescriptModule

    for (const node of nodes) {
        if (ts.isStringLiteral(node)) {
            addClassReferencesFromString(references, node.text)

            continue
        }

        if (ts.isObjectLiteralExpression(node)) {
            for (const property of node.properties) {
                extractObjectPropertyReferences(property, references)
            }

            continue
        }

        if (ts.isArrayLiteralExpression(node)) {
            extractStringLiteralsFromNodes([...node.elements], references)

            continue
        }

        if (ts.isCallExpression(node)) {
            extractStringLiteralsFromNodes(getCallArguments(node), references)

            continue
        }

        if (ts.isConditionalExpression(node)) {
            extractStringLiteralsFromNodes([node.whenTrue, node.whenFalse], references)

            continue
        }

        if (ts.isTemplateExpression(node)) {
            const spanExpressions = node.templateSpans.map((span) => {
                return span.expression
            })

            extractStringLiteralsFromNodes(spanExpressions, references)
        }
    }
}

function isSimpleSelector(selectorRoot) {
    for (const selector of selectorRoot.nodes) {
        const significantNodes = selector.nodes.filter((node) => {
            return node.type !== "comment" && node.type !== "combinator"
        })

        if (significantNodes.length !== 1) {
            return false
        }
    }

    return true
}

function stripNonStructuralPseudos(selectorRoot) {
    selectorRoot.walk((node) => {
        if (node.type !== "pseudo") {
            return
        }

        const pseudoName = node.value.replace(/^::?/, "")

        if (node.value.startsWith("::")) {
            if (NON_STRUCTURAL_PSEUDO_ELEMENTS.has(pseudoName)) {
                node.remove()
            }

            return
        }

        if (NON_STRUCTURAL_PSEUDO_CLASSES.has(pseudoName)) {
            node.remove()
        }
    })

    return selectorRoot
}

/**
 * @param {string} cssPath
 * @returns {import("./no-unused-selectors.types.ts").TemplateVariablesType}
 */
function resolveTemplateVariables(cssPath) {
    const parsed = path.parse(cssPath)
    const cssDirectory = parsed.dir
    const cssName = parsed.name
    const cssBaseName = cssName.replace(/\.module$/, "")
    const cssDirectoryName = path.basename(cssDirectory)

    return { cssBaseName, cssDirectory, cssDirectoryName, cssName }
}

/**
 * @param {string} cssPath
 * @param {string[]} templates
 * @returns {string[]}
 */
function resolveDocumentPaths(cssPath, templates) {
    const variables = resolveTemplateVariables(cssPath)

    return templates.map((template) => {
        return template
            .replaceAll("{cssDirectory}", variables.cssDirectory)
            .replaceAll("{cssName}", variables.cssName)
            .replaceAll("{cssBaseName}", variables.cssBaseName)
            .replaceAll("{cssDirectoryName}", variables.cssDirectoryName)
    })
}

/**
 * @param {string[]} documentPaths
 * @returns {import("./no-unused-selectors.types.ts").ResolvedDocumentType[]}
 */
function resolveAllDocuments(documentPaths) {
    const documents = []

    for (const documentPath of documentPaths) {
        try {
            const content = fs.readFileSync(documentPath, "utf8")

            documents.push({ content, path: documentPath })
        } catch {
            // File doesn't exist, skip
        }
    }

    return documents
}

/**
 * @param {string} sourceContent
 * @param {string} filePath
 * @returns {Set<string>}
 */
function extractClassReferences(sourceContent, filePath) {
    /** @type {Set<string>} */
    const references = new Set()

    const ts = getTypeScript()

    if (!ts) {
        return references
    }

    const sourceFile = ts.createSourceFile(
        filePath,
        sourceContent,
        ts.ScriptTarget.Latest,
        true,
        filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    )

    const cssModuleIdentifiers = new Set()
    const utilityFunctionIdentifiers = new Set()
    const context = { cssModuleIdentifiers, references, utilityFunctionIdentifiers }

    ts.forEachChild(sourceFile, function visit(node) {
        collectCssModuleImports(node, cssModuleIdentifiers)
        collectUtilityImports(node, utilityFunctionIdentifiers)
        collectPropertyAccessReferences(node, context)
        collectBracketAccessReferences(node, context)
        collectClassNameAttributes(node, references)
        collectIdAttributes(node, references)
        collectUtilityCallReferences(node, context)

        ts.forEachChild(node, visit)
    })

    return references
}

/**
 * @param {string} resolvedSelector
 * @returns {{ type: "class" | "id"; value: string } | null}
 */
function extractSimpleSelector(resolvedSelector) {
    let result = null

    try {
        selectorParser((selectors) => {
            const stripped = stripNonStructuralPseudos(selectors)

            if (!isSimpleSelector(stripped)) {
                return
            }

            const firstSelector = stripped.nodes[0]

            if (!firstSelector) {
                return
            }

            const significantNode = firstSelector.nodes.find((node) => {
                return node.type !== "comment" && node.type !== "combinator"
            })

            if (!significantNode) {
                return
            }

            if (significantNode.type === "class") {
                result = { type: "class", value: `.${significantNode.value}` }

                return
            }

            if (significantNode.type === "id") {
                result = { type: "id", value: `#${significantNode.value}` }
            }
        }).processSync(resolvedSelector)
    } catch {
        return null
    }

    return result
}

export {
    DEFAULT_DOCUMENT_TEMPLATES,
    extractClassReferences,
    extractSimpleSelector,
    resolveAllDocuments,
    resolveDocumentPaths,
}
