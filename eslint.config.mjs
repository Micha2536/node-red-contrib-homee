import { defineConfig } from "eslint/config";
import html from "eslint-plugin-html";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("airbnb-base"),

    plugins: {
        html,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        ecmaVersion: 2018,
        sourceType: "commonjs",
    },

    rules: {
        "no-param-reassign": ["error", {
            props: false,
        }],
    },
}, {
    files: ["test/*.spec.js"],

    languageOptions: {
        globals: {
            ...globals.mocha,
        },
    },
}]);