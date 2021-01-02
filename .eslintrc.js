module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    settings: {
        react: {
            version: '16.13.1',
        },
    },
    // parser: 'babel-eslint',
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'sourceType': 'module',
        'ecmaVersion': 2018,
        ecmaFeatures: {
            'jsx': true,
            'modules': true
        }
    },
    plugins: [
        'jest',
        '@typescript-eslint'
    ],
    env: {
        'browser': true,
        'es6': true,
        'node': true,
        "jest/globals": true,
        'jasmine': true
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        "@typescript-eslint/semi": 1,
        'react/prop-types': 'off',
        'react/style-prop-object': 'off',
        'linebreak-style': 0,
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-no-bind': [1, {
            'allowArrowFunctions': false,
            'allowBind': false
        }]

    },
    "overrides": [
        {
            "files": ["./scripts/*.ts"]
        }
    ]
};