import eslint from '@eslint/js';
import eslintConfigLove from 'eslint-config-love';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  eslint.configs.recommended,
  eslintConfigLove,
  prettier,
  {
    ignores: [
      "node_modules/",
      "dist/"
    ],
    plugins: {
      import: importPlugin,
      "jsx-a11y": jsxA11y
    },
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: false,
            orderImportKind: "asc"
          }
        }
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "curly": ["error", "all"],
      "no-irregular-whitespace": [
        "error",
        {
          skipTemplates: true,
          skipStrings: true
        }
      ],
      "no-console": [
        "error",
        {
          allow: ["info", "error", "warn"]
        }
      ]
    }
  }
];