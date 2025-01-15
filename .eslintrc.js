module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'react-hooks/exhaustive-deps': 0,
  },
};
