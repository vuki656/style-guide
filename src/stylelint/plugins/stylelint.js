/** @type {import("stylelint").Config} */
const stylelint = {
    rules: {
        "alpha-value-notation": "percentage",
        "annotation-no-unknown": true,
        "at-rule-empty-line-before": [
            "always",
            { ignore: ["first-nested", "after-comment"] },
        ],
        "at-rule-no-unknown": true,
        "at-rule-no-vendor-prefix": true,
        "block-no-empty": true,
        "color-function-notation": "modern",
        "color-hex-alpha": "never",
        "color-hex-length": "long",
        "color-named": "never",
        "color-no-invalid-hex": true,
        "comment-empty-line-before": ["always", { except: ["first-nested"] }],
        "comment-no-empty": true,
        "custom-property-empty-line-before": "never",
        "custom-property-no-missing-var-function": true,
        "declaration-block-no-duplicate-properties": true,
        "declaration-block-no-redundant-longhand-properties": [
            true,
            { ignoreShorthands: "grid-template" },
        ],
        "declaration-block-no-shorthand-property-overrides": true,
        "declaration-no-important": true,
        "declaration-property-value-no-unknown": true,
        "font-family-name-quotes": "always-where-required",
        "font-family-no-duplicate-names": true,
        "font-family-no-missing-generic-family-keyword": true,
        "font-weight-notation": "numeric",
        "function-calc-no-unspaced-operator": true,
        "function-linear-gradient-no-nonstandard-direction": true,
        "function-name-case": "lower",
        "function-no-unknown": true,
        "function-url-no-scheme-relative": true,
        "function-url-quotes": "always",
        "hue-degree-notation": "angle",
        "import-notation": "string",
        "keyframe-block-no-duplicate-selectors": true,
        "keyframe-declaration-no-important": true,
        "keyframe-selector-notation": "percentage",
        "length-zero-no-unit": true,
        "lightness-notation": "percentage",
        "media-feature-name-no-unknown": true,
        "media-feature-name-no-vendor-prefix": true,
        "media-feature-name-value-no-unknown": true,
        "media-feature-range-notation": "prefix",
        "media-query-no-invalid": true,
        "named-grid-areas-no-invalid": true,
        "no-descending-specificity": true,
        "no-duplicate-at-import-rules": true,
        "no-duplicate-selectors": true,
        "no-empty-source": true,
        "no-invalid-double-slash-comments": true,
        "no-invalid-position-at-import-rule": true,
        "no-irregular-whitespace": true,
        "no-unknown-animations": true,
        "no-unknown-custom-media": true,
        "no-unknown-custom-properties": true,
        "number-max-precision": 3,
        "property-no-unknown": true,
        "property-no-vendor-prefix": true,
        "rule-empty-line-before": [
            "always",
            {
                except: ["after-single-line-comment"],
                ignore: ["first-nested", "after-comment"],
            },
        ],
        "selector-anb-no-unmatchable": true,
        "selector-attribute-quotes": "always",
        "selector-no-vendor-prefix": true,
        "selector-not-notation": "complex",
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-element-colon-notation": "single",
        "selector-pseudo-element-no-unknown": true,
        "selector-type-case": "lower",
        "selector-type-no-unknown": true,
        "shorthand-property-no-redundant-values": true,
        "string-no-newline": true,
        "unit-allowed-list": ["px", "rem", "%"],
        "unit-no-unknown": true,
        "value-keyword-case": "lower",
        "value-no-vendor-prefix": true,
    },
}

module.exports = {
    stylelint,
}
