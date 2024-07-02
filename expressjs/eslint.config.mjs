import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
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
    },
  },
  {
    files: ["*.d.ts"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
