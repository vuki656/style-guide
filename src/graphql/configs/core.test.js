const { ESLint } = require("eslint")
const graphqlEslint = require("@graphql-eslint/eslint-plugin")

const config = require("./core.js")

const eslint = new ESLint({
    overrideConfig: [
        ...config,
        {
            files: ["**/*.graphql"],
            languageOptions: {
                parser: graphqlEslint,
                parserOptions: {
                    graphQLConfig: {
                        schema: "type Query { id: ID! }",
                    },
                },
            },
        },
    ],
    overrideConfigFile: true,
})

describe("graphql", () => {
    test("loads without errors", async () => {
        const results = await eslint.lintText(
            `type Query {
                id: ID!
            }`,
            { filePath: "test.graphql" },
        )

        expect(results).toBeDefined()
        expect(results[0].fatalErrorCount).toBe(0)
    })
})
