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
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
  },
  {
    rules: {
      // ваши правила ESLint здесь
    },
  },
];
