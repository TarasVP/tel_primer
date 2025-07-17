import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import jest from 'eslint-plugin-jest'
import importPlugin from 'eslint-plugin-import'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      jest,
      import: importPlugin,
    },
  },

  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        //project: './tsconfig.json',
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.ts', '.tsx'], // Все нужные расширения
        },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      'jest/no-focused-tests': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': ['error'],
      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true,
          skipStrings: true,
        },
      ],
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/**/!(*.test.{ts,tsx})', // Исключаем тестовые файлы
              from: './src/test',
              message: 'Test imports are only allowed in *.test.ts files',
            },
          ],
        },
      ],
    },
  },
]
