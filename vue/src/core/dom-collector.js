import UAParser from 'ua-parser-js';
import Semver from 'semver';

const domCollector = {
  compatibleBrowsers: [
    {
      name: 'chrome',
      version: '>=71.0.0',
    },
    {
      name: 'firefox',
      version: '>=65.0.0',
    },
    {
      name: 'edge',
      version: '>=18.0.0',
    },
  ],

  capture() {
    if (!this.compatibleBrowser()) {
      return false;
    }

    const ua = navigator.userAgent;
    const url = window.location.href;
    const html = new XMLSerializer().serializeToString(document);

    const captureData = {
      ua,
      url,
      html,
    };

    return captureData;
  },

  compatibleBrowser() {
    const browserData = new UAParser().getBrowser();

    const compatiblebrowser = this.compatibleBrowsers.find(
      browser => browser.name === browserData.name.toLowerCase(),
    );

    /**
     * Check if the browser is supported.
     */
    if (!compatiblebrowser) {
      return false;
    }

    /**
     * Check if the browser version is supported.
     */
    if (!Semver.satisfies(
      Semver.coerce(browserData.version),
      compatiblebrowser.version,
    )) {
      return false;
    }

    return true;
  },
};

export default domCollector;
