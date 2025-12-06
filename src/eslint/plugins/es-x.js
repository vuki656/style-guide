import plugin from "eslint-plugin-es-x";

export const esX = {
    plugins: {
        "es-x": plugin,
    },
    rules: {
        ...plugin.configs["flat/restrict-to-es2022"].rules,
    },
};
