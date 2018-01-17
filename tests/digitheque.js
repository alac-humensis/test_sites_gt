var misc = require('../src/helpers/misc.js');
/**
 * Ensemble de sélecteurs permettant de naviguer dans la digithèque
 */
var elts = {
  tabs: {
    home : 'div.institution-infos img',
    tabRessources: 'a[ui-sref="app.resources"]',
    tabMesRessources: 'a[ui-sref="app.library"]',
    tabSeances: 'a[ui-sref="app.assignements"]',
    tabEleves: 'a[ui-sref="app.groups"]',
    tabStats: 'a[ui-sref="app.statistics-v2"]',
    tabForum: 'a[gt-institution-translate="MODULE_FORUM_MENU"]',
    tabMsg: 'a[ui-sref="app.messaging"]',
  },
  btnCreerGpElv: 'button[ui-sref="app.groups.create"]'
}

function logContext(browser) {
  browser.windowHandle(function(handleObj) {
    console.log('Main handleObj : ');
    console.log(handleObj);
  });
}

function home(browser){
  browser.click(elts.tabs.home);
  browser.pause(500);
}


module.exports = {

    'Digitheque Login' : function (browser) {
      browser
        .url('http://enseignant.digitheque-belin.fr')
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('#gt-placeholder-0', 1000)
        .setValue('#gt-placeholder-0', 'alexandre.lac@editions-belin.fr')
        .setValue('#gt-placeholder-1', ['Digitest', browser.Keys.ENTER]);
        //.click('button[type=submit]')
        //.assert.containsText('#main', 'Night Watch')
        //.expect.element('#main').text.to.not.contain('The Night Watch');
        
        browser.waitForElementVisible(elts.tabs.home, 10000);
        /*
        browser.expect.element('.home-banner');
        browser.expect.element('.home-banner').to.be.present;
        browser.waitForElementVisible('body>div:first-child', 10000);
        browser.expect.element('body>div:first-child').to.have.css('background-color', 'Test de le couleur de bandeau').which.equals('#e10d7d');
        browser.expect.element('body>div:first-child').to.have.css('background-color', 'Test RGB de le couleur de bandeau').which.equals('rgb(225, 13, 125)');
        browser.expect.element('#main').to.not.be.present;
        */
    },

    'Creation de groupe' : function(browser) {
      home(browser);
      //browser.click('a[ui-sref="app.resources"]');
      //browser.click('a[ui-sref="app.groups"]');
      browser.click(elts.tabs.tabEleves);
      //browser.waitForElementVisible('button[ui-sref="app.groups.create"]', 2000);
      browser.waitForElementVisible(elts.btnCreerGpElv, 2000);
      browser.click(elts.btnCreerGpElv);
      browser.pause(3000);
      browser.click('div.gt-modal button.btn-cancel');
      //var now = new Date();
      //console.log('Jour : ' + (now.getDate().toString().padStart(2, '0')) );
      var now = misc.getDateStr();
      browser.pause(3000);
      //home(browser);
      //browser.pause(2500);
      //browser.click(elts.btnCreerGpElv);
    },

    after : function(browser) {
      console.log('Closing down...');
      browser.end();
    },
  };