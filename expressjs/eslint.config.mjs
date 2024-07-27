import globals from "globals";
import tseslint from "typescript-eslint";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,js}"],
    rules: {
      eqeqeq: "warn",
      "handle-callback-err": "error",
      "no-console": "error",
      "no-duplicate-case": "error",
      "no-lone-blocks": "error",
      "no-this-before-super": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "rest-spread-spacing": "error",
      "spaced-comment": "error",
      "valid-typeof": "error",
      "no-unused-vars": "error",
    },
  },
  {
    files: ["*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ["*.d.ts"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
