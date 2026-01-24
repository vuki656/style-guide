import { createRequire } from "node:module"

let cachedPlugin

function getPlugin() {
    if (!cachedPlugin) {
        const require = createRequire(import.meta.url)

        try {
            cachedPlugin = require("eslint-plugin-storybook")
        } catch {
            throw new Error(
                "eslint-plugin-storybook is required for storybook config. " +
                    "Install it: npm install -D eslint-plugin-storybook",
            )
        }
    }

    return cachedPlugin
}

/** @type {import("@eslint/config-helpers").Config} */
export const storybook = {
    get plugins() {
        return { storybook: getPlugin() }
    },
    rules: {
        "storybook/await-interactions": "error",
        "storybook/context-in-play-function": "error",
        "storybook/csf-component": "error",
        "storybook/default-exports": "error",
        "storybook/hierarchy-separator": "error",
        "storybook/meta-inline-properties": "error",
        "storybook/no-redundant-story-name": "error",
        "storybook/no-title-property-in-meta": "error",
        "storybook/no-uninstalled-addons": "error",
        "storybook/prefer-pascal-case": "error",
        "storybook/story-exports": "error",
        "storybook/use-storybook-expect": "error",
        "storybook/use-storybook-testing-library": "error",
    },
}
