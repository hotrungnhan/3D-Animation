/** @type {import('eslint').Linter.Config} */
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react-hooks',
    'import',
    'tailwindcss',
    'prettier',
    'simple-import-sort',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],

    'import/no-anonymous-default-export': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/enforces-negative-arbitrary-values': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/no-arbitrary-value': 'off',
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        config: 'tailwind.config.cjs',
        cssFiles: ['./node_modules/tw-elements/dist/css/index.min.css'],
      },
    ],
    'tailwindcss/no-contradicting-classname': 'error',
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
  },
}
