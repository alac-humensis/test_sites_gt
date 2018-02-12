var misc = require('../helpers/misc.js');


import SiteTemplate from './GtLmsTemplate';

class Digitheque extends SiteTemplate {
  constructor() {
    super();
    /**
    * Ensemble de sélecteurs permettant de naviguer dans la digithèque
    */
    //var Digitheque_elts = {
    this.elts = {
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
          blockClass : 'discipline',
          opened : true
        },
        dominante : {
          label : 'DOMINANTE',
          blockClass : 'dominante',
          opened : false
        },
        niveau : {
          label : 'NIVEAU',
          blockClass : 'niveau',
          opened : false
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
    var activeColor = misc.colorFromHex('#E60077');
    var activeFilterColor = misc.colorFromHex('#0298ca');
    var inactiveColor = misc.colorFromHex('#6C797A');
    var lightText = misc.colorFromHex('#FFF');

    //var Digitheque_colors = {
    this.colors = {
      placeholderText : misc.colorFromHex('#6F7780'),
      activeColor : activeColor,
      inactiveColor : misc.colorFromHex('#6C797A'),
      lightText : lightText,
      filters : {
        activeColor : activeFilterColor,
        puces : activeFilterColor,
        item : {
          unselected :{
            checkbox : misc.colorFromHex('#e8e8e8'),
            text : misc.colorFromHex('#2c3e50'),
            count : {
              background : misc.colorFromHex('#757575'),
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
          unselect : misc.colorFromHex('#6e6e6e')
        },
        discipline : {
          background : misc.colorFromHex('#2c3e50'),//actuellement #34495e
          text : lightText
        },
        dominante : {
          background : misc.colorFromHex('#e8e8e8'),
          text : misc.colorFromHex('#6e6e6e')
        },
        niveau : {
          background : misc.colorFromHex('#34495e'),
          text : lightText
        }
      },
      buttons : {
        default : {
          background : misc.colorFromHex('#E60077'),
          text : lightText
        },
        secondary : {
          background : misc.colorFromHex('#F2F3F4'),
          text : misc.colorFromHex('#E60077')
        }
      },
      home : {
        cards : {
          number_1 : {
            num : '1',
            pastille : misc.colorFromHex('#e10d7d'),
            button : {
              background : misc.colorFromHex('#e10d7d'),
              text : lightText
            }
          },
          number_2 : {
            num : '2',
            pastille : misc.colorFromHex('#632682'),
            button : {
              background : misc.colorFromHex('#632682'),
              text : lightText
            }
          },
          number_3 : {
            num : '3',
            pastille : activeFilterColor,
            button : {
              background : activeFilterColor,
              text : lightText
            }
          },
          number_4 : {
            num : '4',
            pastille : misc.colorFromHex('#2e3364'),
            button : {
              background : misc.colorFromHex('#2e3364'),
              text : lightText
            }
          }
        }
      }
    }

    //this.elts = Digitheque_elts;
    //this.colors = Digitheque_colors;
    this.colors.buttons.default.background = this.colors.activeColor;
    this.colors.buttons.secondary.text = this.colors.activeColor;
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