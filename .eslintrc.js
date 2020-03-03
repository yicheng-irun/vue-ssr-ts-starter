module.exports = {
    root: true,
    env: {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    extends: [
        "airbnb",
        "plugin:vue/recommended",
    ],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    plugins: [
        'vue'
    ],
    rules: {
        'linebreak-style':0,
        'camelcase': [2, {
            "properties": "never",
            "ignoreDestructuring": true,
        }],
        // 4格缩进
        'indent': ['error', 4, {
            "SwitchCase": 1
        }],
        // 声明函数时，函数名和括号间要有空格
        'space-before-function-paren': ['error', 'always'],
        // 声明函数时，函数名和括号间要有空格
        'space-before-function-paren': ['error', 'always'],
        'import/no-unresolved': 'off',

        // 允许对参数的属性进行修改
        'no-param-reassign': [
            'error',
            {
                'props': false,
            }
        ],
        'max-len': ['error', {
            code: 200,
            tabWidth: 4,
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
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