import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  reactRecommended,
  {
    rules: {
      eqeqeq: "warn",
      "handle-callback-err": "error",
      "no-duplicate-case": "error",
      "no-lone-blocks": "error",
      "no-this-before-super": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unused-vars": "warn",
      "rest-spread-spacing": "error",
      "spaced-comment": "error",
      "valid-typeof": "error",
      "react/react-in-jsx-scope": "off", // Turn off react-jsx rule
    },
  },
];
