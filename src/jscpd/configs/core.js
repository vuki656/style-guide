const config = {
    absolute: false,
    gitignore: true,
    ignore: ["**/__generated__/**", "**/*.test.ts", "**/*.e2e.ts", "**/index.ts"],
    minLines: 5,
    minTokens: 70,
    pattern: "src/**/*.{ts,tsx}",
    reporters: ["console"],
    threshold: 0,
}

export default config
