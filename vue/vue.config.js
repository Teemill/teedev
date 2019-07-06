// const StatsPlugin = require('stats-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const webpack = require('webpack');

const bundles = {
  app: [
    'vue',
    'vuex',
    'vue-router',
    'stylis',
    'axios',
  ],
  other: [
    'core-js',
    'fortawesome',
  ],
  moment: [
    'moment',
  ],
};

module.exports = {
  devServer: {
    public: '0.0.0.0:8080',
  },
  // lintOnSave: undefined,
  configureWebpack: {
    plugins: [
      // new StatsPlugin('stats.json'),
      new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      // minSize: 30000,
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      cacheGroups: {
        // test: {
        //   name: 'moment',
        //   test: module => /moment/.test(module.context),
        //   priority: 10,
        //   chunks: 'all',
        //   enforce: false,
        //   reuseExistingChunk: true,
        // },
        // vendor: {
        //   name: 'vendor',
        //   test(module) {
        //     return (
        //       /node_modules/.test(module.context)
        //     );
        //   },
        //   chunks: 'all',
        //   reuseExistingChunk: true,
        // },
        vendor: {
          chunks: 'all',
          enforce: true,
          test: /node_modules/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName

            const match = module.context.match(/[\\/]node_modules[\\/]([^\\/]+)(?:[\\/]|$)/);

            if (match && match[1]) {
              const packageName = match[1].replace('@', '');

              const chunkName = Object.keys(bundles)
                .find(bundleName => bundles[bundleName].includes(packageName));

              if (chunkName) {
                return chunkName;
              }
            }

            return 'vendor';
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: false,
        },
      },
    });
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
          @import "@/global/assets/scss/variables.scss";
          @import "@/global/assets/scss/transitions.scss";
        `,
      },
    },
  },
};
