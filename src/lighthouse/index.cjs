const ASSERTION = { aggregationMethod: "median" }

/**
 * Lighthouse CI config for a static marketing site. URLs come from `SEO_LH_URLS`, and
 * `SEO_LH_INP=1` adds the interaction assertion, which only a page with interactive elements can
 * meet.
 *
 * @param {{ inp?: boolean; urls?: string[] }} [config] - Run specific values
 * @returns {object} Lighthouse CI config
 */
function core(config) {
    const {
        inp = process.env.SEO_LH_INP === "1",
        urls = (process.env.SEO_LH_URLS ?? "").split(",").filter(Boolean),
    } = config ?? {}

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
                    throttlingMethod: "simulate",
                },
                url: urls,
            },
        },
    }
}

module.exports = { core }
