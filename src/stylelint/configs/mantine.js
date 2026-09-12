/**
 * Overrides for projects using postcss-preset-mantine. Its
 * `$mantine-breakpoint-*` variables are not valid media query syntax until
 * postcss expands them, so the rule that checks that syntax is off.
 *
 * @type {import("stylelint").Config}
 */
const config = {
    rules: {
        "media-query-no-invalid": null,
    },
}

export default config
