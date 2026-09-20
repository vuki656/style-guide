const ASSERTION = { aggregationMethod: "median" }

/**
 * Lighthouse CI configuration
 *
 * @param {{ inp?: boolean; urls?: string[] }} [config] - Run specific values, read from SEO_LH_URLS
 *   and SEO_LH_INP when omitted
 * @returns {object} Lighthouse CI config
 */
function core(config) {
    // eslint-disable-next-line n/no-process-env -- The run supplies its URLs through the environment
    const { SEO_LH_INP, SEO_LH_URLS } = process.env

    const { inp = SEO_LH_INP === "1", urls = (SEO_LH_URLS ?? "").split(",").filter(Boolean) } =
        config ?? {}

    const assertions = {
        "categories:accessibility": ["error", { ...ASSERTION, minScore: 0.9 }],
        "categories:performance": ["error", { ...ASSERTION, minScore: 0.9 }],
        "categories:seo": ["error", { ...ASSERTION, minScore: 0.95 }],
        "cumulative-layout-shift": ["error", { ...ASSERTION, maxNumericValue: 0.01 }],
        "largest-contentful-paint": ["error", { ...ASSERTION, maxNumericValue: 2500 }],
    }

    if (inp) {
        assertions["interaction-to-next-paint"] = ["error", { ...ASSERTION, maxNumericValue: 200 }]
    }

    return {
        ci: {
            assert: { assertions },
            collect: {
                numberOfRuns: 3,
                settings: {
                    chromeFlags: "--no-sandbox --disable-dev-shm-usage --disable-gpu",
                    formFactor: "mobile",
                    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
                    screenEmulation: {
                        deviceScaleFactor: 1.75,
                        disabled: false,
                        height: 823,
                        mobile: true,
                        width: 412,
                    },
                    throttlingMethod: "devtools",
                },
                url: urls,
            },
        },
    }
}

module.exports = { core }
