const CONTENT_LAYERS = ["content(?:/(?:articles|glossary|guides|services|tools))?"]

const SHARED_LAYERS = [
    "shared/(?:clients|constants|helpers|hooks|providers|schemas|types|validations|utils(?:/(?:agent|article|banking|claims|date|document|finance|form|guide|holidays|hub3|i18n|identification|inquiry|invoice|loan|number|refresh|route|seo|service|string|tax|tool|usage|validation))?)",
]

const UI_LAYERS = ["ui/(?:_client/)?(?:components|documents|email|guide|kit|og)"]

const AGGREGATE_LAYERS = [...CONTENT_LAYERS, ...SHARED_LAYERS, ...UI_LAYERS]

const INDEX_SUFFIX = "(?:/index(?:\\.[cm]?[jt]sx?)?)?/?$"

/** @type {{ message: string; regex: string }[]} */
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
