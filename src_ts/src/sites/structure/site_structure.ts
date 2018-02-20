import { FilterSideBar } from "./filter";
import { BasicAccessor } from "./basic_accessor";
import { colorFromHex } from "../../helpers/color";

"use strict";


var misc = require('../../helpers/misc.js');


class GtLMSCommonButtons{
  submit : BasicAccessor;
  btnCreerGpElv: BasicAccessor;
}
class GtLMSCommonColors{
  submit : BasicAccessor;
  colors;//TODO
  elts;
}
class GtLMSCommonElts{
  filterSidebar : FilterSideBar;
  buttons : GtLMSCommonButtons;
}

class GtLMSCommonData{
  colors;//TODO
  elts : GtLMSCommonElts;
}

export class GtLMSStructure{
  site;
  common;
  loginPage;
  tabs;
  user;
  selector : String;

  constructor(site) {
    let self = this;
    this.site = site;

    let activeColor = colorFromHex('#E60077');
    let activeFilterColor = colorFromHex('#0298ca');
    let inactiveColor = colorFromHex('#6C797A');
    let lightText = colorFromHex('#FFF');

    this.common = {
      colors : /*{
      }*/
      {
        placeholderText : colorFromHex('#6F7780'),
        activeColor : activeColor,
        inactiveColor : colorFromHex('#6C797A'),
        lightText : lightText,
        filters : {
          activeColor : colorFromHex('#0298ca'),
          puces : activeFilterColor,
          item : {
            unselected :{
              checkbox : colorFromHex('#e8e8e8'),
              text : colorFromHex('#2c3e50'),
              count : {
                background : colorFromHex('#757575'),
                text : lightText
              }
            },
            selected :{
              checkbox : activeFilterColor,
              text : activeFilterColor,
              count : {
                background : activeFilterColor,
                text : lightText
              }
            }
          },
          header : {
            background : activeFilterColor,
            text : lightText,
            unselect : colorFromHex('#6e6e6e')
          },
          discipline : {
            background : colorFromHex('#2c3e50'),//actuellement #34495e
            text : lightText
          },
          dominante : {
            background : colorFromHex('#e8e8e8'),
            text : colorFromHex('#6e6e6e')
          },
          niveau : {
            background : colorFromHex('#34495e'),
            text : lightText
          }
        },
        buttons : {
          default : {
            background : activeColor,
            text : lightText
          },
          secondary : {
            background : colorFromHex('#F2F3F4'),
            text : activeColor
          }
        }
      },
      elts : {
        filterSidebar : new FilterSideBar(),
        /*filters : {
          sidebar : new BasicAccessor(null, 'div.list-header-sidebar-button'),
          sidebar_toggle : new BasicAccessor(null, 'div.toggle-sidebar-button'),
          discipline : new Filter(self.common.elts.sidebar, 'discipline', 'DISCIPLINE', true),
          dominante : new Filter(self.common.elts.sidebar, 'dominante', 'DOMINANTE', false),
          niveau : new Filter(self.common.elts.sidebar, 'niveau', 'NIVEAU', false)
        },*/
        buttons : {
          submit: 'button[type=submit]',
          eleves : {
            btnCreerGpElv: '[ui-sref="app.groups.create"]'
          }
        }  
      }
    }

    this.loginPage = {
      register : new BasicAccessor(null, 'button.auth-register'),
      login : new BasicAccessor(null, 'button.btn-login'),
      pwdLost : new BasicAccessor(null, 'a[ui-sref="auth.password.lost"]')
    }
    //this.pwdLost.colors.text
    this.tabs = {
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
            btnNouvSeance : {
              selector : 'button.new-module',
              label : 'CRÉER UNE SÉANCE'
            },
            btnSelection : {
              selector : 'button.basket-button',
              label : 'Ma sélection (0)'
            }
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
        tableauBord: 'a[ui-sref="app.statistics-v2"]',
        evalCognitives : 'a[ui-sref="app.cognitiveAssesmentInfo"]',
        forum: 'a[gt-institution-translate="MODULE_FORUM_MENU"]',
        msg: 'a[ui-sref="app.messaging"]',
    }
    this.user = {
        myProfile : 'a[ui-sref="myprofile"]',
        logout : 'a.logout'
    }
  }
  
  get bloc() { return this.selector}
  get background() { return this.bloc+' div.gt-meta-filter-name'}
  get title() { return this.bloc+' div.title'}
  get unselect() { return this.bloc+' .gt-meta-filter-cancel span'}
  get collapse() { return this.bloc+' .gt-meta-filter-collapse'}
  get puce() { return this.collapse+' i'}
    //puce_old: function(blockClass) { return this.bloc(blockClass)+' .fa-chevron-circle-down, '+this.bloc(blockClass)+' .fa-chevron-circle-right'},
  get values() { return this.bloc+' div.gt-meta-filter-values'}
  get item() { return this.values+' div.gt-meta-filter-item'}
  get itemCheckBoxOn() { return this.item+' i.fa-check-square' }
  get itemCheckBoxOff() { return this.item+'  i.fa-square' }
  get itemCheckBox() { return this.itemCheckBoxOff+', '+this.itemCheckBoxOn }
  get itemTitle() { return this.item+' span.name'}
  get itemCount() { return this.item+' span.nb-value'}
}
