const CONTENT_LAYERS = ["content(?:/(?:tools|guides))?"]

const SHARED_LAYERS = [
    "shared/(?:clients|constants|helpers|hooks|providers|schemas|types|validations|utils(?:/(?:string|date|form|number|banking|identification|validation|tool|route|seo|storage|document))?)",
]

const UI_LAYERS = ["ui/(?:_client/)?(?:components|documents|guide|print|docx|kit)"]

const AGGREGATE_LAYERS = [...CONTENT_LAYERS, ...SHARED_LAYERS, ...UI_LAYERS]

const INDEX_SUFFIX = "(?:/index(?:\\.[cm]?[jt]sx?)?)?/?$"

/**
 * Import patterns that reject aggregate barrels and current-directory barrels.
 * Spread these when a config adds its own `no-restricted-imports` options,
 * because ESLint replaces the rule's options instead of merging them.
 *
 * @type {Array<{ message: string; regex: string }>}
 */
export const NO_BARREL_PATTERNS = [
    {
        message: "Import from a specific component or module instead of an aggregate barrel.",
        regex: `^(?:@/|(?:\\.\\.?/)+)(?:${AGGREGATE_LAYERS.join("|")})${INDEX_SUFFIX}`,
    },
    {
        message:
            "Import sibling implementation files directly instead of the current directory's barrel.",
        regex: `^\\.${INDEX_SUFFIX}`,
    },
]

/** @type {import("@eslint/config-helpers").Config} */
export const noBarrels = {
    rules: {
        "no-restricted-imports": ["error", { patterns: NO_BARREL_PATTERNS }],
    },
}
