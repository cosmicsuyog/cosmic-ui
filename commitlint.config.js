export default {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "wip",
      ],
    ],

    "subject-case": [
      2,
      "never",
      ["start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never"],
    "subject-max-length": [2, "always", 100],

    "header-max-length": [2, "always", 100],

    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],

    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
  },
};
