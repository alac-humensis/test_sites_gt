"use strict";

var misc = require('../helpers/misc.js');


import SiteTemplate from './GtLmsTemplate';

class Digitheque extends SiteTemplate {
  constructor() {
    super();
    this.accounts = {
      prof : {
        login : 'alexandre.lac@editions-belin.fr',
        password : 'Digitest'
      }
    }
  }
  ////  Fonctions "_nomFonction()" à surcharger dans les classes filles  ////
  _siteName(){
    return 'Digithèque';
  }
  _url(){
    return 'http://enseignant.digitheque-belin.fr';
  }
  ////  FIN Fonctions à surcharger dans les classes filles  ////

}


var Digitheque_inst = new Digitheque();
module.exports = Digitheque_inst;

export default Digitheque;