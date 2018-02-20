module.exports = {
    
  'Info' : function (browser) {
    browser
      //.url('http://enseignant.digitheque-belin.fr')
      .url('https://www.google.fr')
      .waitForElementVisible('body', 5000, true, undefined, 'Navigateur '+browser.options.desiredCapabilities.browserName);
    browser.end();
  }
};