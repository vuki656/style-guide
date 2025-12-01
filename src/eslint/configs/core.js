import esXPlugin from "../plugins/es-x.js"
import eslintPlugin from "../plugins/eslint.js"
import eslintCommentsPlugin from "../plugins/eslint-comments.js"
import etcPlugin from "../plugins/etc.js"
import importXPlugin from "../plugins/import-x.js"
import prettierPlugin from "../plugins/prettier.js"
import promisePlugin from "../plugins/promise.js"
import rimacPlugin from "../plugins/rimac.js"
import simpleImportSortPlugin from "../plugins/simple-import-sort.js"
import sonarjsPlugin from "../plugins/sonarjs.js"
import sortDestructureKeysPlugin from "../plugins/sort-destructure-keys.js"
import sortKeysFixPlugin from "../plugins/sort-keys-fix.js"
import stylisticPlugin from "../plugins/stylistic.js"
import unicornPlugin from "../plugins/unicorn.js"
import unusedImportsPlugin from "../plugins/unused-imports.js"

const coreConfig = [
    eslintPlugin,
    esXPlugin,
    eslintCommentsPlugin,
    promisePlugin,
    unicornPlugin,
    unusedImportsPlugin,
    importXPlugin,
    sonarjsPlugin,
    etcPlugin,
    sortKeysFixPlugin,
    sortDestructureKeysPlugin,
    stylisticPlugin,
    simpleImportSortPlugin,
    rimacPlugin,
    prettierPlugin,
]

export default coreConfig
