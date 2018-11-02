module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "plugins": ["jest"],
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-quotes": ["error", "prefer-single"],
        "react/jsx-one-expression-per-line": false,
        "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }],
        "linebreak-style": 0,
        "jsx-a11y/label-has-for": "off",
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                labelComponents: ['label'],
            },
        ],
    }
};