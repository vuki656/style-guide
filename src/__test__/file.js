/**
 * @param {any} text
 * @param {import("prettier/index").Options} options
 * @returns
 */
const animals = await sql`
    SELECT
        first_name,
        species
    FROM
        animals
    WHERE
        id = ${id}
`
