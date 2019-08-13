// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .percySnapshot('Homepage test', { widths: [768, 992, 1200] })
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js + TypeScript App')
      .assert.elementCount('img', 1)
      .end()
  }
}
