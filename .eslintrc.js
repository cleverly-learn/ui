const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
    'no-relative-import-paths',
    'sort-imports-es6-autofix',
  ],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': WARN,

    'import/prefer-default-export': OFF,
    'import/order': OFF,

    '@typescript-eslint/interface-name-prefix': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,

    'class-methods-use-this': OFF,

    'unused-imports/no-unused-imports': WARN,
    'no-relative-import-paths/no-relative-import-paths': [
      WARN,
      { rootDir: 'src' },
    ],
    'sort-imports-es6-autofix/sort-imports-es6': WARN,
  },
};