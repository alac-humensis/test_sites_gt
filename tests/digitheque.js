require = require('@std/esm')(module)
var digi = require('../src/sites/Digitheque.mjs');

//module.exports = digi;
module.exports = {
  'Authentification' : function(browser){
    digi._init_(browser);
    digi.login();
  },

  'Vérification des couleurs' : function(browser) {
    ////  ACCUEIL  ////
    browser.verify.cssProperty('.menu-item.active a', 'color', digi.colors.activeColor.cssString(browser), 'Test de surcharge de fonction : '+digi.siteName());
    digi.checkColors();
  }
}