module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, {
            "extensions": [".js", ".jsx"]
        }],
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "indent": [
            "error",
            4
        ],
        "react/jsx-indent": [
            "error",
            4
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "one-var": [
            "error",
            "always"
        ],
        "comma-dangle": [
            "error", 
            "never"
        ],
        "max-len": 0
    }
};
