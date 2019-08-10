module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
      },
    ],
  ],
  plugins: [
    [
      'transform-imports',
      {
        'lodash': {
          transform: 'lodash/${member}',
          preventFullImport: false,
        },
        'element-ui': {
          transform: importName => `element-ui/lib/${importName.toLowerCase()}`,
          preventFullImport: false,
        },
      },
    ],
  ],
};
