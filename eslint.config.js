import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import promise from "eslint-plugin-promise";
import n from "eslint-plugin-n";

export default [
  // ─── Ignored paths ───────────────────────────────────────
  {
    ignores: [
      "dist",
      "build",
      "coverage",
      "node_modules",
      "*.min.js",
      "public",
      ".husky",
      ".next",
      ".env*",
    ],
  },

  // ─── BACKEND: Node.js/Express ────────────────────────────
  {
    files: ["server/**/*.js", "server.js", "index.js", "config/**/*.js"],

    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      import: importPlugin,
      promise,
      n,
    },

    rules: {
      // Core JavaScript
      ...js.configs.recommended.rules,

      "no-console": [
        "warn",
        { allow: ["warn", "error", "info"] },
      ],

      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "no-var": "error",
      "prefer-const": ["error", { destructuring: "all" }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-shadow": "error",
      "no-duplicate-imports": "error",

      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["acc", "state", "draft", "req"],
        },
      ],

      "object-shorthand": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["warn", "as-needed"],
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "spaced-comment": ["error", "always"],
      "consistent-return": "error",
      "default-case": "error",
      "no-else-return": "error",

      "no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true },
      ],

      "max-depth": ["warn", 4],

      "max-lines": [
        "warn",
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      complexity: ["warn", 10],

      // Node.js & Promises
      ...n.configs["flat/recommended"].rules,
      ...promise.configs.recommended.rules,

      "promise/always-return": "off",

      // Imports
      "import/no-duplicates": "error",
      "import/no-self-import": "error",
      "import/no-cycle": ["warn", { maxDepth: 3 }],
      "import/first": "error",
      "import/newline-after-import": "error",

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.js",
            "**/tests/**/*.js",
            "vite.config.*",
          ],
        },
      ],

      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
          ],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // ─── FRONTEND: React/JSX ─────────────────────────────────
  {
    files: ["client/**/*.{js,jsx}", "library/**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.es2021,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      promise,
    },

    rules: {
      // Core JavaScript
      ...js.configs.recommended.rules,

      "no-console": ["error", { allow: ["warn", "error"] }],

      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "no-var": "error",
      "prefer-const": ["error", { destructuring: "all" }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-shadow": "error",
      "no-duplicate-imports": "error",

      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["acc", "state", "draft"],
        },
      ],

      "object-shorthand": "error",
      "prefer-template": "error",

      "prefer-destructuring": [
        "warn",
        {
          array: false,
          object: true,
        },
      ],

      "prefer-arrow-callback": "error",
      "arrow-body-style": ["warn", "as-needed"],
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "spaced-comment": ["error", "always"],
      "consistent-return": "error",
      "default-case": "error",
      "no-else-return": "error",

      "no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true },
      ],

      "max-depth": ["warn", 4],

      "max-lines": [
        "warn",
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      complexity: ["warn", 10],

      // React
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-useless-fragment": "warn",

      "react/jsx-pascal-case": "error",

      "react/jsx-curly-brace-presence": [
        "warn",
        {
          props: "never",
          children: "never",
        },
      ],

      "react/self-closing-comp": "error",
      "react/no-array-index-key": "warn",
      "react/no-unstable-nested-components": "error",
      "react/hook-use-state": "warn",

      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      // Imports
      "import/no-duplicates": "error",
      "import/no-self-import": "error",
      "import/no-cycle": ["warn", { maxDepth: 3 }],
      "import/first": "error",
      "import/newline-after-import": "error",

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.{js,jsx}",
            "**/*.spec.{js,jsx}",
            "vite.config.*",
          ],
        },
      ],

      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
          ],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // Accessibility
      ...jsxA11y.configs.recommended.rules,

      // Promises
      ...promise.configs.recommended.rules,
      "promise/always-return": "off",
    },
  },
];