import { NO_BARREL_PATTERNS } from "../plugins/no-barrels.js"

const DEFAULT_ALIAS = "@/i18n/navigation"

const DEFAULT_FILES = ["src/**/*.{ts,tsx}", "e2e/**/*.{ts,tsx}"]

const DEFAULT_GLOBAL_ERROR_FILES = ["**/global-error.tsx"]

/**
 * Paths that force locale-aware navigation instead of the Next.js originals
 *
 * @param {string} [alias] - Module holding the next-intl navigation helpers
 * @returns {{ importNames?: string[]; message: string; name: string }[]} Restricted paths
 */
function nextIntlPaths(alias = DEFAULT_ALIAS) {
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
 * Restricts `usePathname` everywhere except global errors
 *
 * @param {string} [alias] - Module holding the next-intl navigation helpers
 * @returns {{ importNames: string[]; message: string; name: string }} Restricted path
 */
function nextIntlPathnamePath(alias = DEFAULT_ALIAS) {
    return {
        importNames: ["usePathname"],
        message: `Use usePathname from ${alias}; only global errors read raw locale prefixes.`,
        name: "next/navigation",
    }
}

/**
 * Next-intl navigation configuration
 *
 * @param {{
 *     additionalFiles?: string[]
 *     additionalPaths?: { importNames?: string[]; message: string; name: string }[]
 *     alias?: string
 *     files?: string[]
 *     globalErrorFiles?: string[]
 *     patterns?: { message: string; regex: string }[]
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
        patterns = NO_BARREL_PATTERNS,
    } = config ?? {}

    const targetFiles = files ?? [...DEFAULT_FILES, ...(additionalFiles ?? [])]
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
