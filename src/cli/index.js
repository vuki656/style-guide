#!/usr/bin/env node

import { intro, outro } from "@clack/prompts"

import { runInit } from "./init.js"

const command = process.argv[2]

if (command === "init") {
    intro("@dvukovic/style-guide")
    await runInit()
    outro("Configuration complete!")
} else {
    process.stderr.write("Usage: style-guide init\n")
    process.stderr.write("\n")
    process.stderr.write("Commands:\n")
    process.stderr.write("  init    Initialize configuration files\n")
    // eslint-disable-next-line n/no-process-exit -- CLI entry point
    process.exit(1)
}
