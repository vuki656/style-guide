import plugin from "eslint-plugin-storybook"

/** @type {import("@eslint/config-helpers").Config} */
export const storybook = {
    plugins: {
        storybook: plugin,
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
