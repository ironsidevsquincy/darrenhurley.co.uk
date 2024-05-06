const eslint = require('@eslint/js')
const tsEslint = require('typescript-eslint')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const importPlugin = require('eslint-plugin-import')
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort')

module.exports = tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  // FIXME: commented out until `eslint-plugin-import` is eslint v9 compatible
  //  https://github.com/import-js/eslint-plugin-import/pull/2996
  // importPlugin.configs.recommended,
  importPlugin.configs.typescript,
  {
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-ignore': 'allow-with-description'
      }],
      '@typescript-eslint/ban-types': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi'
        }
      }],
      '@typescript-eslint/naming-convention': ['error', {
        selector: 'default',
        format: null
      }, {
        selector: 'variable',
        format: ['strictCamelCase', 'PascalCase', 'UPPER_CASE']
      }, {
        selector: 'function',
        format: ['strictCamelCase']
      }, {
        selector: 'parameter',
        format: ['strictCamelCase', 'StrictPascalCase']
      }, {
        selector: 'parameterProperty',
        format: ['strictCamelCase']
      }, {
        selector: 'method',
        format: ['strictCamelCase']
      }],
      '@typescript-eslint/no-extra-semi': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/space-infix-ops': 'error',
      '@typescript-eslint/type-annotation-spacing': 'error',
      camelcase: 'off',
      'comma-dangle': 'error',
      'max-statements-per-line': ['error', {
        max: 1
      }],
      'no-console': 'error',
      'no-extra-semi': 'off',
      'one-var': ['error', 'never'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'space-infix-ops': 'off'
    }
  }
)
