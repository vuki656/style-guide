const { defineConfig } = require("vitest/config")

module.exports = defineConfig({
    test: {
        globals: true,
        include: ["src/**/configs/*.test.js"],
    },
})
