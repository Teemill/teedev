module.exports = (api, projectOptions) => {
  api.chainWebpack((webpackConfig) => {
    // modify webpack config with webpack-chain
    // console.log('Global ChainWebpack', process.env.VUE_APP);
  });

  api.configureWebpack((webpackConfig) => {
    // modify webpack config
    // or return object to be merged with webpack-merge
    // console.log('Global ConfigureWebpack', process.env.VUE_APP);
  });

  api.registerCommand('test', (args) => {
    // register `vue-cli-service test`
    console.log('Hello There');

    api.chainWebpack((webpackConfig) => {
      // modify webpack config with webpack-chain

      webpackConfig
        .entry('app')
          .add('./src/teemill/main.js')
          .end();
    });
  });

  // api.describeTask({
  //   // RegExp executed on script commands to select which task will be described here
  //   match: /vue-cli-service test/,
  //   description: 'Compiles and hot-reloads for development',
  //   // "More info" link
  //   link: 'https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#serve'
  // });
};
