// const StatsPlugin = require('stats-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    public: '0.0.0.0:8080',
  },
  // lintOnSave: undefined,
  configureWebpack: {
    plugins: [
      // new StatsPlugin('stats.json'),
      new BundleAnalyzerPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        // vue$: 'vue/dist/vue.common',
        // Src: path.resolve('src/'),
        // Helpers: path.resolve('src/helpers'),
        // Cbow: path.resolve('src/workspaces/cbow'),
      },
    },
  },
  // pluginOptions: {
  //   webpackBundleAnalyzer: {
  //     openAnalyzer: false,
  //   },
  // },
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/global/assets/scss/core.scss";
            @import "@/global/assets/scss/variables.scss";
            @import "@/global/assets/scss/transitions.scss";
          `,
      },
    },
  },
};
