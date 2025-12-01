const eslintPlugin = require("../plugins/eslint.js")
const esXPlugin = require("../plugins/es-x.js")
const eslintCommentsPlugin = require("../plugins/eslint-comments.js")
const promisePlugin = require("../plugins/promise.js")
const unicornPlugin = require("../plugins/unicorn.js")
const unusedImportsPlugin = require("../plugins/unused-imports.js")
const importXPlugin = require("../plugins/import-x.js")
const sonarjsPlugin = require("../plugins/sonarjs.js")
const etcPlugin = require("../plugins/etc.js")
const sortKeysFixPlugin = require("../plugins/sort-keys-fix.js")
const sortDestructureKeysPlugin = require("../plugins/sort-destructure-keys.js")
const stylisticPlugin = require("../plugins/stylistic.js")
const simpleImportSortPlugin = require("../plugins/simple-import-sort.js")
const rimacPlugin = require("../plugins/rimac.js")

module.exports = [
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
]
