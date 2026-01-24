export default {
    git: {
        commitMessage: "chore(release): ${version} [skip ci]",
        requireBranch: "master",
        requireCleanWorkingDir: true,
        tagName: "v${version}",
    },
    github: {
        release: true,
        releaseName: "v${version}",
    },
    npm: {
        publish: true,
        skipChecks: true,
    },
    plugins: {
        "@release-it/conventional-changelog": {
            header: "# Changelog\n\nAll notable changes to this project will be documented in this file.\n",
            infile: "CHANGELOG.md",
            preset: {
                name: "conventionalcommits",
                types: [
                    { section: "Features", type: "feat" },
                    { section: "Bug Fixes", type: "fix" },
                    { section: "Code Refactoring", type: "refactor" },
                    { section: "Performance Improvements", type: "perf" },
                    { hidden: true, section: "Documentation", type: "docs" },
                    { hidden: true, section: "Styles", type: "style" },
                    { hidden: true, section: "Tests", type: "test" },
                    { hidden: true, section: "Build System", type: "build" },
                    { hidden: true, section: "CI/CD", type: "ci" },
                    { hidden: true, section: "Chores", type: "chore" },
                ],
            },
            whatBump: (commits) => {
                let level = 2
                let breakings = 0
                let features = 0

                for (const commit of commits) {
                    if (commit.notes && commit.notes.length > 0) {
                        const hasBreaking = commit.notes.some((note) => {
                            return note.title === "BREAKING CHANGE"
                        })

                        if (hasBreaking) {
                            breakings = breakings + 1
                            level = 0
                        }
                    }

                    if (commit.type === "feat" || commit.type === "refactor") {
                        features = features + 1

                        if (level === 2) {
                            level = 1
                        }
                    }
                }

                if (level === 0) {
                    return {
                        level: 0,
                        reason: `There are ${breakings} BREAKING CHANGES`,
                    }
                }

                if (level === 1) {
                    return {
                        level: 1,
                        reason: `There are ${features} features or refactors`,
                    }
                }

                return {
                    level: 2,
                    reason: "There are only fixes or other minor changes",
                }
            },
        },
    },
}
