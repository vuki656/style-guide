import plugin from "eslint-plugin-perfectionist"

/** @type {import("@eslint/config-helpers").Config} */
export const perfectionist = {
    plugins: {
        perfectionist: plugin,
    },
    rules: {
        "perfectionist/sort-classes": [
            "error",
            {
                groups: [
                    "index-signature",
                    "static-block",
                    ["static-property", "static-accessor-property"],
                    ["static-get-method", "static-set-method"],
                    "static-method",
                    ["property", "accessor-property"],
                    ["get-method", "set-method"],
                    "constructor",
                    "method",
                    "unknown",
                ],
                newlinesBetween: 1,
                newlinesInside: 1,
                type: "alphabetical",
            },
        ],
        "perfectionist/sort-enums": [
            "error",
            {
                type: "alphabetical",
            },
        ],
        "perfectionist/sort-exports": [
            "error",
            {
                type: "alphabetical",
            },
        ],
        "perfectionist/sort-imports": [
            "error",
            {
                groups: [
                    "side-effect",
                    "builtin",
                    "external",
                    "internal",
                    ["parent", "sibling", "index"],
                ],
                newlinesBetween: 1,
                type: "alphabetical",
            },
        ],
        "perfectionist/sort-interfaces": [
            "error",
            {
                type: "alphabetical",
            },
        ],
        "perfectionist/sort-named-exports": [
            "error",
            {
                type: "alphabetical",
            },
        ],
        "perfectionist/sort-named-imports": [
            "error",
            {
                type: "alphabetical",
            },
        ],
        "perfectionist/sort-object-types": [
            "error",
            {
                type: "alphabetical",
            },
        ],
        "perfectionist/sort-objects": [
            "error",
            {
                type: "alphabetical",
            },
        ],
    },
}
