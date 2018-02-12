require = require('@std/esm')(module)
//var digi = require('../src/sites/Digitheque.mjs');

//module.exports = digi;
/*
// OK
var digi = require('../src/sites/Digitheque.mjs');
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
*/


// NOK
/*
import Digitheque from '../src/sites/Digitheque';
var Digitheque_inst = new Digitheque();

module.exports = Digitheque_inst.genNodeExport();
*/

//
var digi = require('../src/sites/Digitheque.mjs');
module.exports = digi.genNodeExport();
