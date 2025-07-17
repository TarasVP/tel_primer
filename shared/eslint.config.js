import tsEslint from "typescript-eslint";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    rules: {
      // ваши правила ESLint здесь
    },
  },
];
