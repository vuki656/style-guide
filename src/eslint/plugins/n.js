import pluginNode from "eslint-plugin-n"

const plugin = {
    plugins: {
        n: pluginNode,
    },
    rules: {
        "n/callback-return": "error",
        "n/exports-style": "error",
        "n/global-require": "error",
        "n/handle-callback-err": "error",
        "n/hashbang": "error",
        "n/no-deprecated-api": "error",
        "n/no-exports-assign": "error",
        "n/no-extraneous-import": "error",
        "n/no-extraneous-require": "error",
        "n/no-missing-require": "error",
        "n/no-new-require": "error",
        "n/no-path-concat": "error",
        "n/no-process-env": "error",
        "n/no-process-exit": "error",
        "n/no-unpublished-bin": "error",
        "n/no-unsupported-features/es-builtins": [
            "error",
            {
                version: ">=22.0.0",
            },
        ],
        "n/prefer-global/buffer": "error",
        "n/prefer-global/console": "error",
        "n/prefer-global/process": "error",
        "n/prefer-global/text-decoder": "error",
        "n/prefer-global/text-encoder": "error",
        "n/prefer-global/url": "error",
        "n/prefer-global/url-search-params": "error",
        "n/prefer-node-protocol": "error",
        "n/prefer-promises/dns": "error",
        "n/prefer-promises/fs": "error",
    },
}

export default plugin
