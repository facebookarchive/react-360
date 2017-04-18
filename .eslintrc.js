module.exports = {
  extends: [
    'fbjs',
    'prettier'
  ],

  plugins: [
    "prettier",
  ],

  rules: {
    'accessor-pairs': 'off',
    'consistent-return': 'off',
    'eqeqeq': 'error',
    'key-spacing': ['warn', {beforeColon: false, afterColon: true}],
    'max-len': ['warn', {code: 120, ignoreComments: true}],
    'no-bitwise': 'off',
    'no-tabs': 'warn',
    'no-var': 'warn',
    'object-curly-spacing': ['warn', 'never'],
    'prefer-const': ['warn', {destructuring: 'all'}],
    'space-in-parens': 'warn',

    // Prettier
    "prettier/prettier": [
      "error",
      {
        "bracketSpacing": false,
        "jsxBracketSameLine": true,
        "singleQuote": true,
        "trailingComma": "es5",
        "printWidth": 100,
      }
    ]
  },
  globals: {
    '__DEV__': true,
    '__dirname': false,
    '__fbBatchedBridgeConfig': false,
  }
}
