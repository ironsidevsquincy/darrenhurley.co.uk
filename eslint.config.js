import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import stylisticPlugin from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

export default tsEslint.config(
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
      'simple-import-sort': simpleImportSortPlugin,
      'stylistic': stylisticPlugin
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-ignore': 'allow-with-description'
      }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
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
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
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
      'space-infix-ops': 'off',
      'stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi'
        }
      }],
      'stylistic/no-extra-semi': 'error',
      'stylistic/space-infix-ops': 'error',
      'stylistic/type-annotation-spacing': 'error',
    }
  }
)
