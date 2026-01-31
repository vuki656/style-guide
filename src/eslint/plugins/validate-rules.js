export function validatePluginRules(pluginConfig) {
    const { plugins, rules } = pluginConfig

    if (!plugins || !rules) {
        return
    }

    for (const ruleKey of Object.keys(rules)) {
        const separatorIndex = ruleKey.startsWith("@")
            ? ruleKey.indexOf("/", ruleKey.indexOf("/") + 1)
            : ruleKey.indexOf("/")

        if (separatorIndex === -1) {
            continue
        }

        const pluginPrefix = ruleKey.slice(0, separatorIndex)
        const ruleName = ruleKey.slice(separatorIndex + 1)
        const plugin = plugins[pluginPrefix]

        if (!plugin) {
            throw new Error(
                `Rule "${ruleKey}" references plugin "${pluginPrefix}" which is not in plugins`,
            )
        }

        const pluginRules = plugin.rules ?? plugin.module?.rules

        if (!pluginRules?.[ruleName]) {
            throw new Error(`Rule "${ruleName}" does not exist in plugin "${pluginPrefix}"`)
        }
    }
}
