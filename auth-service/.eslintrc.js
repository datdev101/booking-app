module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'es2019',
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@darraghor/nestjs-typed'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'node_modules',
    'dist',
    'coverage',
    'jest.config.js',
    'commitlint.config.js',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-classes-per-file': ['error', { ignoreExpressions: true, max: 10 }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'import/no-unresolved': [
      0,
      {
        commonjs: true,
        amd: true,
      },
    ],
  },
};
