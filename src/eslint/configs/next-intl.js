import { ALL_JS_TS_FILES } from "../file-patterns.js"

const DEFAULT_ALIAS = "@/i18n/navigation"

const DEFAULT_GLOBAL_ERROR_FILES = ["**/global-error.tsx"]

/**
 * Paths that force locale-aware navigation instead of the Next.js originals
 *
 * @param {string} [alias] - Module holding the next-intl navigation helpers
 * @returns {Array<{ importNames?: string[]; message: string; name: string }>} Restricted paths
 */
export function nextIntlPaths(alias = DEFAULT_ALIAS) {
    return [
        {
            message: `Use Link from ${alias}.`,
            name: "next/link",
        },
        {
            importNames: ["useRouter", "redirect", "permanentRedirect"],
            message: `Use locale-aware navigation from ${alias}.`,
            name: "next/navigation",
        },
    ]
}

/**
 * `usePathname` stays available in global errors, which render outside the
 * next-intl providers and have to read the raw locale prefix themselves.
 *
 * @param {string} [alias] - Module holding the next-intl navigation helpers
 * @returns {{ importNames: string[]; message: string; name: string }} Restricted path
 */
export function nextIntlPathnamePath(alias = DEFAULT_ALIAS) {
    return {
        importNames: ["usePathname"],
        message: `Use usePathname from ${alias}; only global errors read raw locale prefixes.`,
        name: "next/navigation",
    }
}

/**
 * next-intl navigation configuration. Pass `patterns` for any other
 * `no-restricted-imports` patterns the project needs, because ESLint replaces
 * the rule's options instead of merging them.
 *
 * @param {{
 *     additionalFiles?: string[]
 *     additionalPaths?: Array<{ importNames?: string[]; message: string; name: string }>
 *     alias?: string
 *     files?: string[]
 *     globalErrorFiles?: string[]
 *     patterns?: Array<{ message: string; regex: string }>
 * }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends[]} ESLint configs
 */
export function nextIntl(config) {
    const {
        additionalFiles,
        additionalPaths = [],
        alias = DEFAULT_ALIAS,
        files,
        globalErrorFiles = DEFAULT_GLOBAL_ERROR_FILES,
        patterns = [],
    } = config ?? {}

    const targetFiles = files ?? [...ALL_JS_TS_FILES, ...(additionalFiles ?? [])]
    const paths = [...nextIntlPaths(alias), ...additionalPaths]

    return [
        {
            files: targetFiles,
            rules: {
                "no-restricted-imports": ["error", { paths, patterns }],
            },
        },
        {
            files: targetFiles,
            ignores: globalErrorFiles,
            rules: {
                "no-restricted-imports": [
                    "error",
                    { paths: [...paths, nextIntlPathnamePath(alias)], patterns },
                ],
            },
        },
    ]
}
