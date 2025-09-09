import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import jest from 'eslint-plugin-jest'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      jest,
    },
  },

  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'jest/no-focused-tests': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true,
          skipStrings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@glimmung/back/**',
                '!@glimmung/back/**/',
                '!@glimmung/back/**/input',
                '!@glimmung/back/src/utils/can',
              ],
              allowTypeImports: true,
              message: 'Only types and input schemas are allowed to be imported from backend workspace',
            },
          ],
        },
      ],
    },
  },
]
