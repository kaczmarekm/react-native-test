module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    'max-params': ['error', 3],
    'react-native/no-inline-styles': 'error',
    'no-nested-ternary': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-shadow': 'off',
    'no-extra-boolean-cast': 'off',
    'no-useless-escape': 'off',
  },
  globals: {
    JSX: 'readonly',
    NodeJS: 'readonly',
  },
};
