module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
      'standard-with-typescript',
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    "@typescript-eslint/dot-notation": 'error'
  }
}
