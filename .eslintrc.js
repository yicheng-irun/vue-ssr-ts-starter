module.exports = {
    env: {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended",
        // "plugin:import",
    ],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    plugins: [
        'vue'
    ],
    rules: {
        "indent": [
            "error",
            4
        ],
        // "linebreak-style": [
        //     "error",
        //     "unix"
        // ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [0],
        "vue/html-indent": [
            'error',
            4
        ]
    }
};