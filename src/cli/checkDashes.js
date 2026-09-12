import { readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"

const DASH_PATTERN = /[—–]/gu

const SCANNED_TREES = [
    { extensions: [".json"], recursive: false, root: "src/i18n/messages" },
    { extensions: [".ts", ".mdx"], recursive: true, root: "src/content" },
]

function collectFiles(root, recursive, extensions) {
    if (!statSync(root, { throwIfNoEntry: false })) {
        return []
    }

    return readdirSync(root, { recursive, withFileTypes: true })
        .filter((entry) => {
            return entry.isFile() && extensions.includes(path.extname(entry.name))
        })
        .map((entry) => {
            return path.relative(process.cwd(), path.join(entry.parentPath, entry.name))
        })
        .sort((left, right) => {
            return left.localeCompare(right)
        })
}

function findDashes() {
    const hits = []

    for (const tree of SCANNED_TREES) {
        for (const file of collectFiles(tree.root, tree.recursive, tree.extensions)) {
            readFileSync(file, "utf8")
                .split("\n")
                .forEach((line, index) => {
                    if (DASH_PATTERN.test(line)) {
                        hits.push(`${file}:${index + 1}: ${line.trim()}`)
                    }

                    DASH_PATTERN.lastIndex = 0
                })
        }
    }

    return hits
}

export function runCheckDashes() {
    const hits = findDashes()

    for (const hit of hits) {
        process.stdout.write(`FAIL  ${hit}\n`)
    }

    process.stdout.write(
        hits.length === 0
            ? "check:dashes  no em or en dashes in messages or content\n"
            : `check:dashes  ${hits.length} em or en dashes found; use a comma, a colon, parentheses or a word\n`,
    )

    return hits.length === 0
}
