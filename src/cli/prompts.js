import * as clack from "@clack/prompts"

class SetupCancelledError extends Error {
    constructor() {
        super("Setup cancelled.")
        this.name = "SetupCancelledError"
    }
}

export async function promptToolSelection() {
    const tools = await clack.multiselect({
        initialValues: ["eslint", "prettier"],
        message: "Which tools would you like to configure?",
        options: [
            { label: "ESLint", value: "eslint" },
            { label: "Prettier", value: "prettier" },
            { label: "Stylelint", value: "stylelint" },
            { label: "CSpell", value: "cspell" },
            { label: "Knip", value: "knip" },
        ],
        required: true,
    })

    if (clack.isCancel(tools)) {
        clack.cancel("Setup cancelled.")

        throw new SetupCancelledError()
    }

    return tools
}

export async function promptESLintOptions() {
    const language = await clack.select({
        message: "Which language are you using?",
        options: [
            { label: "TypeScript", value: "typescript" },
            { label: "JavaScript only", value: "javascript" },
        ],
    })

    if (clack.isCancel(language)) {
        clack.cancel("Setup cancelled.")

        throw new SetupCancelledError()
    }

    let strictMode = false

    if (language === "typescript") {
        const strict = await clack.select({
            message: "TypeScript strictness level?",
            options: [
                { label: "Standard", value: "standard" },
                { label: "Strict (additional type-checked rules)", value: "strict" },
            ],
        })

        if (clack.isCancel(strict)) {
            clack.cancel("Setup cancelled.")

            throw new SetupCancelledError()
        }

        strictMode = strict === "strict"
    }

    const framework = await clack.select({
        message: "Which framework are you using?",
        options: [
            { label: "None (Node.js)", value: "none" },
            { label: "React", value: "react" },
            { label: "Next.js", value: "next" },
        ],
    })

    if (clack.isCancel(framework)) {
        clack.cancel("Setup cancelled.")

        throw new SetupCancelledError()
    }

    let includeNode = framework === "none"
    let includeAws = false

    if (framework === "none") {
        const awsBackend = await clack.confirm({
            initialValue: false,
            message: "Do you use AWS (CDK, SST, SDK)?",
        })

        if (clack.isCancel(awsBackend)) {
            clack.cancel("Setup cancelled.")

            throw new SetupCancelledError()
        }

        includeAws = awsBackend
    } else if (framework === "next") {
        const nodeBackend = await clack.confirm({
            initialValue: false,
            message: "Do you have Node.js API routes?",
        })

        if (clack.isCancel(nodeBackend)) {
            clack.cancel("Setup cancelled.")

            throw new SetupCancelledError()
        }

        includeNode = nodeBackend

        if (nodeBackend) {
            const awsBackend = await clack.confirm({
                initialValue: false,
                message: "Do your API routes use AWS (CDK, SST, SDK)?",
            })

            if (clack.isCancel(awsBackend)) {
                clack.cancel("Setup cancelled.")

                throw new SetupCancelledError()
            }

            includeAws = awsBackend
        }
    }

    const testing = await clack.multiselect({
        message: "Which testing frameworks do you use?",
        options: [
            { label: "Jest", value: "jest" },
            { label: "Vitest", value: "vitest" },
            { label: "Playwright", value: "playwright" },
        ],
        required: false,
    })

    if (clack.isCancel(testing)) {
        clack.cancel("Setup cancelled.")

        throw new SetupCancelledError()
    }

    const extras = await clack.multiselect({
        message: "Any additional configurations?",
        options: [
            { label: "MobX", value: "mobx" },
            { label: "Storybook", value: "storybook" },
            { label: "TanStack Query", value: "tanstackQuery" },
            { label: "Turbo", value: "turbo" },
        ],
        required: false,
    })

    if (clack.isCancel(extras)) {
        clack.cancel("Setup cancelled.")

        throw new SetupCancelledError()
    }

    const monorepo = await clack.confirm({
        initialValue: false,
        message: "Is this a monorepo?",
    })

    if (clack.isCancel(monorepo)) {
        clack.cancel("Setup cancelled.")

        throw new SetupCancelledError()
    }

    const isMonorepo = monorepo

    return {
        extras,
        framework,
        includeAws,
        includeNode,
        isMonorepo,
        language,
        strictMode,
        testing,
    }
}

export async function promptOverwrite(filename) {
    const overwrite = await clack.confirm({
        initialValue: true,
        message: `${filename} already exists. Overwrite?`,
    })

    if (clack.isCancel(overwrite)) {
        clack.cancel("Setup cancelled.")

        throw new SetupCancelledError()
    }

    return overwrite
}

export async function promptInstall(packageManager, packages) {
    const packageList = packages.join(", ")

    const install = await clack.confirm({
        initialValue: true,
        message: `Install ${packageList} using ${packageManager}?`,
    })

    if (clack.isCancel(install)) {
        return false
    }

    return install
}
