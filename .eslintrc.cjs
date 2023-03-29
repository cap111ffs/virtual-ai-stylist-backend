module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'eslint:recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        ts: 'always',
      },
    ],
    'no-underscore-dangle': 'off',
    'linebreak-style': [0],
    'max-len': [2, 100],
    'no-console': 'off',
  },
};
