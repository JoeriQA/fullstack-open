import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin";

export default [
  { ignores: ["dist/**"] },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/quotes": ["error", "double"],
      "no-console": "off",
    },
  },
];
