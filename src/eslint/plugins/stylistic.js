import plugin from "@stylistic/eslint-plugin"

export const stylistic = {
    plugins: {
        "@stylistic": plugin,
    },
    rules: {
        "@stylistic/lines-between-class-members": ["error", "always"],
        "@stylistic/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                next: "return",
                prev: "*",
            },
            {
                blankLine: "always",
                next: "block",
                prev: "*",
            },
            {
                blankLine: "always",
                next: "*",
                prev: "block",
            },
            {
                blankLine: "always",
                next: "block-like",
                prev: "*",
            },
            {
                blankLine: "always",
                next: "*",
                prev: "block-like",
            },
        ],
        "@stylistic/spaced-comment": ["error", "always", { markers: ["/"] }],
    },
}


