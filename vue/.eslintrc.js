module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {
    window: true,
    document: true,
    $ENV: true,
    vc: true,
    describe: true,
    it: true,
    ucfirst: true,
    plural: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'import/extensions': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
