/** @type {import("npm-package-json-lint/dist/src/configuration").Config} */
const packageJsonCore = {
    rules: {
        "bin-type": "error",
        "bundledDependencies-type": "error",
        "config-type": "error",
        "cpu-type": "error",
        "dependencies-type": "error",
        "description-format": [
            "error",
            {
                "name-format": "error",
                "no-duplicate-properties": "error",
                requireCapitalFirstLetter: true,
                requireEndingPeriod: false,

                "version-format": "error",
            },
        ],
        "description-type": "error",
        "devDependencies-type": "error",
        "directories-type": "error",
        "engines-type": "error",
        "files-type": "error",
        "homepage-type": "error",
        "keywords-type": "error",
        "license-type": "error",
        "main-type": "error",
        "man-type": "error",
        "name-type": "error",
        "no-archive-dependencies": "error",
        "no-archive-devDependencies": "error",
        "no-caret-version-dependencies": "error",
        "no-caret-version-devDependencies": "error",
        "no-file-dependencies": "error",
        "no-file-devDependencies": "error",
        "no-git-dependencies": "error",
        "no-git-devDependencies": "error",
        "no-repeated-dependencies": "error",
        "no-restricted-dependencies": [
            "error",
            [
                "typeorm",
                "ramda",
                "lodash",
                "@types/*",
                "eslint",
                "prettier",
                "cspell",
                "npm-package-json-lint",
                "stylelint",
            ],
        ],
        "no-tilde-version-dependencies": "error",
        "no-tilde-version-devDependencies": "error",
        "optionalDependencies-type": "error",
        "os-type": "error",
        "peerDependencies-type": "error",
        "prefer-absolute-version-dependencies": "error",
        "prefer-absolute-version-devDependencies": "error",
        "prefer-alphabetical-dependencies": "error",
        "preferGlobal-type": "error",
        "private-type": "error",
        "repository-type": "error",
        "require-author": "error",
        "require-description": "error",
        "require-engines": "error",
        "require-license": "error",
        "require-name": "error",
        "require-private": "error",
        "require-repository": "error",
        "require-type": "error",
        "require-version": "error",
        "scripts-type": "error",
        "type-type": "error",
        "valid-values-engines": [
            "error",
            [{ node: ">18.0.0" }, { node: ">20.0.0" }, { node: ">22.0.0" }],
        ],
        "version-type": "error",
    },
}

module.exports = {
    packageJsonCore,
}
