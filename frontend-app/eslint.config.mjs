import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable or modify specific rules
      //"react/no-unescaped-entities": "off", // Disable unescaped entities rule
      "@typescript-eslint/no-unused-vars": "warn", // Warn for unused variables
      //"@next/next/no-img-element": "off", // Allow using <img> instead of <Image>
    },
  },
];

export default eslintConfig;
