export function generateScripts(tools, packageManager) {
    const runner = packageManager === "npm" ? "npm run" : packageManager

    const scripts = {}
    const lintParts = []
    const fixParts = []

    if (tools.includes("eslint")) {
        scripts["lint:eslint"] = "eslint . --cache --concurrency=auto"
        lintParts.push(`${runner} lint:eslint`)
        fixParts.push(`${runner} lint:eslint --fix`)
    }

    if (tools.includes("prettier")) {
        scripts["lint:prettier"] = "prettier --log-level=warn --check --cache ."
        lintParts.push(`${runner} lint:prettier`)
        fixParts.push(`${runner} lint:prettier --write`)
    }

    if (tools.includes("stylelint")) {
        scripts["lint:stylelint"] = "stylelint ./**/*.css --cache"
        lintParts.push(`${runner} lint:stylelint`)
        fixParts.push(`${runner} lint:stylelint --fix`)
    }

    if (tools.includes("cspell")) {
        scripts["lint:cspell"] = "cspell --no-progress --no-summary --unique '**'"
        lintParts.push(`${runner} lint:cspell`)
    }

    if (tools.includes("knip")) {
        scripts["lint:knip"] = "knip --cache"
        lintParts.push(`${runner} lint:knip`)
    }

    if (lintParts.length > 0) {
        scripts.lint = lintParts.join(" && ")
    }

    if (fixParts.length > 0) {
        scripts["lint:fix"] = fixParts.join(" && ")
    }

    return scripts
}
