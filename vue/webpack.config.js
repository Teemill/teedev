const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      // vue$: 'vue/dist/vue.common',
      // Src: path.resolve('src/'),
      // Helpers: path.resolve('src/helpers'),
      // Cbow: path.resolve('src/workspaces/cbow'),
    },
  },
};
