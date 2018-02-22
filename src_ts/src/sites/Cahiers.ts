import { colorFromHex } from "../helpers/color";
import { Digitheque } from "./Digitheque";

//"use strict";
/*
var misc = require('../helpers/misc.js');

var Cahiers_elts = {
  tabs: {
    home : 'div.institution-infos img',
    ressources: {
      selector : 'a[ui-sref="app.resources"]',
      label : 'Ressources',
      list_header : {
        container : 'list-header',
        search : {
          container : 'search div.search',
          ico : 'i.fa-search',
          input : '.search input[type="search"]',
          placeholder : '.search input[type="search"]::placeholder'//pseudo-classe inaccessible ?
        },
        favorites_toggle : 'favorites-toggle',
        btnNouvSeance : 'button.new-module',
      },
      tabsCont : 'div.gt-tabs-menu',
      tabSelected : 'div.gt-tabs-menu__item--active',
      tabUnselected : 'div.gt-tabs-menu__item:not(.gt-tabs-menu__item--active)',
      tabExosDocs : {
        selector : 'div[ui-sref="app.resources"]',
        label : 'Exercices/Documents',
        ligneRess : {
          tag : 'learning-object'
        }
      },
      tabSeances : {
        selector : 'div[ui-sref="app.resources.modules"]',
        label : 'Séances',
        ligneRess :{
          tag : 'module'
        }
      },
      tabSeancesPart : {
        selector : 'div[ui-sref="app.resources.shared"]',
        label : 'Séances partagées',
        ligneRess : {
          tag : 'module'
        }
      },
      waitMsg : 'div.gt-loader',
      ress_template : {
        container : function(ressTag) { return ressTag},
        cover : function(ressTag) { return this.container(ressTag) + ' div.cover'},
        infos : function(ressTag) { return this.container(ressTag) + ' div.infos'},
        title : function(ressTag) { return this.infos(ressTag) + ' .title'},
        author : function(ressTag) { return this.infos(ressTag) + ' .author'},
        description : function(ressTag) { return this.infos(ressTag) + ' .description'},
        metas : function(ressTag) { return this.container(ressTag) + ' div.metas div.meta'},
        actions : function(ressTag) { return this.container(ressTag) + ' div.actions'},
        fav : function(ressTag) { return this.actions(ressTag) + ' .action.favorite i.fa-star-o'},
        preview : function(ressTag) { return this.container(ressTag) + ' .action.lo-preview'},
        infos_popup : function(ressTag) { return this.container(ressTag) + ' .action.lo-edit-meta2'},
        add : function(ressTag) { return this.container(ressTag) + ' .action.lo-add'},
        //diff avec learning-object
        infos_popup_mod : function(ressTag) { return this.container(ressTag) + ' .action .fa-stack-2x'},
        webreader : function(ressTag) { return this.container(ressTag) + ' .webreader a'},
        //todo
        more_actions : function(ressTag) { return this.container(ressTag) + ' div.dropdown-actions'},
      },
    },
    mesRessources: 'a[ui-sref="app.library"]',
    seances: 'a[ui-sref="app.assignments"]',
    eleves: 'a[ui-sref="app.groups"]',
    stats: 'a[ui-sref="app.statistics-v2"]',
    forum: 'a[gt-institution-translate="MODULE_FORUM_MENU"]',
    msg: 'a[ui-sref="app.messaging"]',
  },
  user: {
    myProfile : 'a[ui-sref="myprofile"]',
    logout : 'a.logout'
  },
  filters : {
    sidebar : 'div.list-header-sidebar-button',
    sidebar_toggle : 'div.toggle-sidebar-button',
    filter_template : {
      //rep : '#SPEC_CLASS#',
      bloc: function(blockClass) { return 'div.gt-meta-filter-bloc.'+blockClass},
      background: function(blockClass) { return this.bloc(blockClass)+' div.gt-meta-filter-name'},
      title: function(blockClass) { return this.bloc(blockClass)+' div.title'},
      unselect: function(blockClass) { return this.bloc(blockClass)+' .gt-meta-filter-cancel span'},
      collapse: function(blockClass) { return this.bloc(blockClass)+' .gt-meta-filter-collapse'},
      puce: function(blockClass) { return this.collapse(blockClass)+' i'},
      //puce_old: function(blockClass) { return this.bloc(blockClass)+' .fa-chevron-circle-down, '+this.bloc(blockClass)+' .fa-chevron-circle-right'},
      values: function(blockClass) { return this.bloc(blockClass)+' div.gt-meta-filter-values'},
      item: function(blockClass) { return this.values(blockClass)+' div.gt-meta-filter-item'},
      itemCheckBoxOn: function(blockClass) { return this.item(blockClass)+' i.fa-check-square' },
      itemCheckBoxOff: function(blockClass) { return this.item(blockClass)+'  i.fa-square' },
      itemCheckBox: function(blockClass) { return this.itemCheckBoxOff(blockClass)+', '+this.itemCheckBoxOn(blockClass) },
      itemTitle: function(blockClass) { return this.item(blockClass)+' span.name'},
      itemCount: function(blockClass) { return this.item(blockClass)+' span.nb-value'}
    },
    discipline : {
      label : 'DISCIPLINE',
      blockClass : 'discipline'
    },
    dominante : {
      label : 'DOMINANTE',
      blockClass : 'dominante'
    },
    niveau : {
      label : 'NIVEAU',
      blockClass : 'niveau'
    }
  },
  buttons : {
    submit: 'button[type=submit]',
    loginPage : {
      register : 'button.auth-register',
      login : 'button.btn-login',
      pwdLost : 'a[ui-sref="auth.password.lost"]'
    },
    eleves : {
      btnCreerGpElv: '[ui-sref="app.groups.create"]'
    }
  }
}
var Cahiers_colors = {
  placeholderText : colorFromHex('#6F7780'),
  activeColor : colorFromHex('#E60077'),
  inactiveColor : colorFromHex('#6C797A'),
  filters : {
    puces : colorFromHex('#0298ca'),
    item : {
      unselected :{
        checkbox : colorFromHex('#e8e8e8'),
        text : colorFromHex('#2c3e50'),
        count : {
          background : colorFromHex('#757575'),
          text : colorFromHex('#fff')
        }
      },
      selected :{
        checkbox : colorFromHex('#0298ca'),
        text : colorFromHex('#0298ca'),
        count : {
          background : colorFromHex('#0298ca'),
          text : colorFromHex('#fff')
        }
      }
    },
    header : {
      background : colorFromHex('#0298CA'),
      text : colorFromHex('#FFF'),
      unselect : colorFromHex('#6e6e6e')
    },
    discipline : {
      background : colorFromHex('#2c3e50'),//actuellement #34495e
      text : colorFromHex('#FFF')
    },
    dominante : {
      background : colorFromHex('#e8e8e8'),
      text : colorFromHex('#6e6e6e')
    },
    niveau : {
      background : colorFromHex('#34495e'),
      text : colorFromHex('#FFF')
    }
  },
  buttons : {
    default : {
      background : colorFromHex('#E60077'),
      text : colorFromHex('#FFF')
    },
    secondary : {
      background : colorFromHex('#F2F3F4'),
      text : colorFromHex('#E60077')
    }
  },
  home : {
    cards : {
      number_1 : {
        num : '1',
        pastille : colorFromHex('#e10d7d'),
        button : {
          background : colorFromHex('#e10d7d'),
          text : colorFromHex('#FFF')
        }
      },
      number_2 : {
        num : '2',
        pastille : colorFromHex('#632682'),
        button : {
          background : colorFromHex('#632682'),
          text : colorFromHex('#FFF')
        }
      },
      number_3 : {
        num : '3',
        pastille : colorFromHex('#0298CA'),
        button : {
          background : colorFromHex('#0298CA'),
          text : colorFromHex('#FFF')
        }
      },
      number_4 : {
        num : '4',
        pastille : colorFromHex('#2e3364'),
        button : {
          background : colorFromHex('#2e3364'),
          text : colorFromHex('#FFF')
        }
      }
    }
  }
}
*/
//import Digitheque from './Digitheque';
//import BasicColors from './ui_accessors/basic_accessor.mjs';

class Cahiers extends Digitheque {
  constructor() {
    super();
  }
  ////  Fonctions "_nomFonction()" à surcharger dans les classes filles  ////
  get siteName(){
    return 'Cahiers connectés';
  }
  /*
  _url(){
    return 'http://belin.cahiersconnectes.fr/';
  }
  */
 initColors(){
   //TODO
 }
 initFilters(){
   //TODO
 }
 initTabs(){
   //TODO
 }
 initAccounts(){
   //TODO
 }
  ////  FIN Fonctions à surcharger dans les classes filles  ////

}


var Cahiers_inst = new Cahiers();
module.exports = Cahiers_inst;