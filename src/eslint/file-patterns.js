const JS_FILES = ["**/*.js", "**/*.cjs", "**/*.mjs"]

export const TS_FILES = ["**/*.ts", "**/*.cts", "**/*.mts"]

export const REACT_FILES = ["**/*.jsx", "**/*.tsx"]

export const ALL_JS_TS_FILES = [...JS_FILES, ...TS_FILES, ...REACT_FILES]

export const TEST_FILES = [
    "**/*.test.js",
    "**/*.test.ts",
    "**/*.spec.js",
    "**/*.spec.ts",
    "**/*.unit.test.js",
    "**/*.unit.test.ts",
    "**/*.int.test.js",
    "**/*.int.test.ts",
    "**/*.integration.test.js",
    "**/*.integration.test.ts",
]

export const NODE_FILES = [...JS_FILES, ...TS_FILES]

export const STORY_FILES = [
    "**/*.stories.js",
    "**/*.stories.ts",
    "**/*.stories.jsx",
    "**/*.stories.tsx",
]
