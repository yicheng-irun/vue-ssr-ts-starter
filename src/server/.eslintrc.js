/**
 * 单独给server端加的eslint文件
 */
const parentRules = require('../../.eslintrc.js').rules;

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends:  [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    parserOptions:  {
        ecmaVersion: 2017,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
    },
    rules: {
        ...parentRules,
        "vue/html-indent": undefined,
    },
};
