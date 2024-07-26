/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["@graphql-eslint"],
    rules: {
        "@graphql-eslint/alphabetize": [
            "error",
            {
                arguments: [
                    "FieldDefinition",
                    "Field",
                    "DirectiveDefinition",
                    "Directive",
                ],
                fields: [
                    "InputObjectTypeDefinition",
                    "InterfaceTypeDefinition",
                    "ObjectTypeDefinition",
                ],
                groups: ["id", "*", "createdAt", "updatedAt"],
                selections: ["FragmentDefinition", "OperationDefinition"],
                variables: ["OperationDefinition"],
            },
        ],
        "@graphql-eslint/description-style": ["error", { style: "block" }],
        "@graphql-eslint/input-name": "error",
        "@graphql-eslint/lone-executable-definition": "error",
        "@graphql-eslint/match-document-filename": [
            "error",
            {
                fileExtension: ".graphql",
                fragment: {
                    style: "PascalCase",
                    suffix: ".fragment.",
                },
                mutation: {
                    style: "PascalCase",
                    suffix: ".mutation.",
                },
                query: {
                    style: "PascalCase",
                    suffix: ".query.",
                },
                subscription: {
                    style: "PascalCase",
                    suffix: ".subscription.",
                },
            },
        ],
        "@graphql-eslint/naming-convention": [
            "error",
            {
                Argument: "camelCase",
                DirectiveDefinition: "camelCase",
                EnumTypeDefinition: {
                    requiredSuffixes: ["Enum"],
                    style: "PascalCase",
                },
                EnumValueDefinition: "PascalCase",
                FieldDefinition: "camelCase",
                "FieldDefinition[gqlType.name.value=Boolean]": {
                    requiredPrefixes: ["is", "has"],
                    style: "camelCase",
                },
                "FieldDefinition[parent.name.value=Mutation]": {
                    forbiddenPrefixes: ["mutation"],
                    forbiddenSuffixes: ["Mutation"],
                },

                "FieldDefinition[parent.name.value=Query]": {
                    forbiddenPrefixes: ["query", "get"],
                    forbiddenSuffixes: ["Query"],
                },

                "FieldDefinition[parent.name.value=Subscription]": {
                    forbiddenPrefixes: ["subscription"],
                    forbiddenSuffixes: ["Subscription"],
                },

                InputValueDefinition: "camelCase",
                InterfaceTypeDefinition: {
                    requiredSuffixes: ["Interface"],
                    style: "PascalCase",
                },
                types: "PascalCase",
            },
        ],
        "@graphql-eslint/no-anonymous-operations": "error",
        "@graphql-eslint/no-deprecated": "error",
        "@graphql-eslint/no-duplicate-fields": "error",
        "@graphql-eslint/no-hashtag-description": "error",
        "@graphql-eslint/no-scalar-result-type-on-mutation": "error",
        "@graphql-eslint/no-typename-prefix": "error",
        "@graphql-eslint/no-unreachable-types": "error",
        "@graphql-eslint/require-deprecation-date": "error",
        "@graphql-eslint/require-deprecation-reason": "error",
        "@graphql-eslint/strict-id-in-types": "error",
        "@graphql-eslint/unique-enum-value-names": "error",
        "@graphql-eslint/unique-fragment-name": "error",
        "@graphql-eslint/unique-operation-name": "error",
    },
}
