import reactApp from 'eslint-config-react-app';
import path from 'path';
import eslint from '@eslint/js';

export default [
  eslint.configs.recommended,
  reactApp,
  {
    // Настройки из вашего .eslintrc.yml
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Правила из вашего .eslintrc.yml
    },
  },
  {
    // Переопределения для vite.config.ts
    files: ['vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },
];