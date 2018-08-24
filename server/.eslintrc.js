module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["prettier"],
  parserOptions: {
    ecmaVersion: 2016
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
