const percy = require('@percy/nightwatch');

module.exports = {
  // src_folders: ['tests/e2e/specs'],
  // output_folder: 'tests/e2e/reports',
  // custom_assertions_path: ['tests/e2e/custom-assertions'],

  custom_commands_path: [ percy.path ],

  selenium: {
    // start_process: true,
    // server_path: require('selenium-server').path,
    // host: '127.0.0.1',
    // port: 4444,
    cli_args: {
      'webdriver.chrome.driver': './drivers/chromedriver.exe', // require('chromedriver').path
    }
  },

  // test_settings: {
  //   default: {
  //     selenium_port: 4444,
  //     selenium_host: 'localhost',
  //     silent: true
  //   },

  //   chrome: {
  //     desiredCapabilities: {
  //       browserName: 'chrome',
  //       javascriptEnabled: true,
  //       acceptSslCerts: true
  //     }
  //   }
  // }
};
