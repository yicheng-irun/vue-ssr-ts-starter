const parentRC = require('../.eslintrc.js');

module.exports = {
    ...parentRC,
    rules: {
        ...parentRC.rules,
        "import/no-extraneous-dependencies": 0,
    }
};