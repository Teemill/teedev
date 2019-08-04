const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/assets/scss/global.scss')]
    }
  }
};
