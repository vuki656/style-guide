/**
 * @param {any} text
 * @param {import("prettier/index").Options} options
 * @returns
 */
export const animals = await sql`
    SELECT
        first_name,
        species
    FROM
        animals
    WHERE
        id = ${id}
`

const value = 3

if (value === 5) {
    animals = "test"
}
