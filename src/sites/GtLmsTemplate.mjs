"use strict";

var misc = require('../helpers/misc.js');
var logIndent = require('../helpers/LogIndent.js');
//Fonction au nom très court pour une utilisation plus rapide de LogIndent dans le code
var idt = function(){ return logIndent.indentStr();}

import GtSiteStructure from './ui_accessors/site_structure.mjs';
import Filter from './ui_accessors/filter.mjs';

/*
élément inaccessible pour le moment (eclu de this.struct pour améliorer la lisibilité :
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
*/
class SiteTemplate{
  constructor() {
    this.accounts = {};
    this.browser = null;
    /**
    * Ensemble de sélecteurs permettant de naviguer dans la digithèque (site par défaut)
    */
    /*
    this.struct = {
      loginPage : {
        register : 'button.auth-register',
        login : 'button.btn-login',
        pwdLost : 'a[ui-sref="auth.password.lost"]'
      },
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
      },
      user: {
        myProfile : 'a[ui-sref="myprofile"]',
        logout : 'a.logout'
      },
      filters : {
        sidebar : 'div.list-header-sidebar-button',
        sidebar_toggle : 'div.toggle-sidebar-button',
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
        eleves : {
          btnCreerGpElv: '[ui-sref="app.groups.create"]'
        }
      }
    }
    */
    this.struct = new GtSiteStructure(this);
    var activeColor = misc.colorFromHex('#E60077');
    var activeFilterColor = misc.colorFromHex('#0298ca');
    var inactiveColor = misc.colorFromHex('#6C797A');
    var lightText = misc.colorFromHex('#FFF');
  
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
          background : activeColor,
          text : lightText
        },
        secondary : {
          background : misc.colorFromHex('#F2F3F4'),
          text : activeColor
        }
      },
    }

    this.colors.buttons.default.background = this.colors.activeColor;
    this.colors.buttons.secondary.text = this.colors.activeColor;
  }

  ////  Fonctions "_nomFonction()" à surcharger dans les classes filles  ////
  _siteName(){
    return 'Template';
  }
  _url(){
    return 'xxx';
  }
  ////  FIN Fonctions à surcharger dans les classes filles  ////
  
  ////  Accesseurs liés aux fonctions à surcharger dans les classes filles  ////
  get siteName(){
    return this._siteName();
  }
  get url(){
    return this._url();
  }
  ////  FIN Accesseurs liés aux fonctions à surcharger dans les classes filles  ////

  init(browser) {
    this.browser = browser;
    browser
      //.url('http://enseignant.digitheque-belin.fr')
      .url('https://www.google.fr')
      .waitForElementVisible('body', 5000, true, undefined, 'Navigateur '+browser.options.desiredCapabilities.browserName);
    //browser.end();

    //console.log('colors.activeColor = '+this.colors.activeColor.hexColor);
    //console.log('colors.filters.puces = '+this.colors.filters.puces.hexColor);
  }

  /**
   * Fonction pour vérifier une couleur d'un élément du DOM
   * @param elt Sélecteur CSS
   * @param cssProp Propriété CSS à vérifier. N.B : possible d'indiquer bg ou txt/text pour plus de simplicité
   * @param color Objet Couleur au format misc.colorFromHex
   * @param msg Message facultatif à afficher dans le test de NightWatch
   */
  checkColor(elt, cssProp, color, msg){
    if(elt === undefined){
      if(msg !== undefined)
        console.log('Test ignoré : '+msg);
      return;
    }
    let testProp = cssProp;
    switch(cssProp){
      case 'bg' : testProp = 'background-color';
        break;
      case 'txt' :
      case 'text' : testProp = 'color';
        break;
    }
    this.browser.verify.cssProperty(this.__cssDest(elt), testProp, color.cssString(this.browser), (msg !== undefined ? idt()+msg : msg));
  }
  
  login() {
    let browser = this.browser;
    browser
      .url(this.url)
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#gt-placeholder-0', 15000);
    
    //Je n'arrive pas à trouver la couleur du texte dans le place-holder
    //browser.verify.cssProperty('#gt-placeholder-7', 'background-color', 'rgb('+selColor.r+', '+selColor.g+', '+selColor.b+')', 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
    let loginPage = this.struct.loginPage;
    this.checkColor(loginPage.register, 'bg', this.colors.buttons.secondary.background, 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
    this.checkColor(loginPage.register, 'text', this.colors.buttons.secondary.text, 'Vérification de la couleur du texte du bouton "S\'enregistrer"');
    this.checkColor(loginPage.login, 'bg', this.colors.buttons.default.background, 'Vérification de la couleur du fond du bouton "Se connecter"');
    this.checkColor(loginPage.login, 'text', this.colors.buttons.default.text, 'Vérification de la couleur du texte du bouton "Se connecter"');
    this.checkColor(loginPage.pwdLost, 'text', this.colors.activeColor, 'Vérification de la couleur du texte "Mot de passe oublié ?"');
    /*
    browser.verify.cssProperty(this.struct.buttons.loginPage.register, 'background-color', this.colors.buttons.secondary.background.cssString(browser), 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
    browser.verify.cssProperty(this.struct.buttons.loginPage.register, 'color', this.colors.buttons.secondary.text.cssString(browser), 'Vérification de la couleur du texte du bouton "S\'enregistrer"');
    browser.verify.cssProperty(this.struct.buttons.loginPage.login, 'background-color', this.colors.buttons.default.background.cssString(browser), 'Vérification de la couleur du fond du bouton "Se connecter"');
    browser.verify.cssProperty(this.struct.buttons.loginPage.login, 'color', this.colors.buttons.default.text.cssString(browser), 'Vérification de la couleur du texte du bouton "Se connecter"');
    browser.verify.cssProperty(this.struct.buttons.loginPage.pwdLost, 'color', this.colors.activeColor.cssString(browser), 'Vérification de la couleur du texte "Mot de passe oublié ?"');
    */
    this.__logIn(this.accounts.prof, true);
  }

  //'Vérification des couleurs'(browser) {
  checkColors() {
      let browser = this.browser;
        //home(browser);
      ////  ACCUEIL  ////
      //Pseudo élément => Element inexistant dans le DOM et donc non testable ici
      //browser.verify.cssProperty('div.user-menu::after', 'border-color', colors.activeColor.cssString(browser), 'Couleur du triangle d\'ouverture "Utilisateur"');
      this.checkColor(this.struct.user.myProfile, 'text', this.colors.activeColor, 'Couleur du texte "Mon profil"');
      this.checkColor(this.struct.user.logout, 'text', this.colors.activeColor, 'Couleur du texte "Se déconnecter"');
  
      ////  RESSOURCES  ////
      this.__checkRessTabColors();

      this.checkColor('.menu-item.active a', 'text', this.colors.activeColor, 'Couleur du texte de l\'onglet actif');
      this.checkColor('.menu-item:not(.active) a', 'text', this.colors.inactiveColor, 'Couleur du texte de l\'onglet inactif');
  }
  

  ////  Fonction __ = Fonctions utilitaires "protected"  ////
  __cssDest(elt){
    return elt.hasOwnProperty('selector') ? elt.selector : elt;
  }
  __home(){
    this.browser.click(this.struct.tabs.home);
    this.browser.pause(500);
  }

  __goTo(cssDest){
    this.__home();
    this.browser.click(cssDest.hasOwnProperty('selector') ? cssDest.selector : cssDest);
  }

  __logIn(account, useEnterKey){
    let browser = this.browser;
    browser.waitForElementVisible('input[ng-model="LoginCtrl.email"]', 5000, 'Attente d\'affichage de la page de connexion');
    browser.setValue('#gt-placeholder-0', account.login);
    if(useEnterKey === true){
      browser.setValue('#gt-placeholder-1', [account.password, browser.Keys.ENTER]);
    }
    else{
      browser.setValue('#gt-placeholder-1', account.prof.password);
      browser.click(this.struct.buttons.submit);
    }
    browser.waitForElementVisible(this.struct.tabs.home, 10000, 'Attente d\'affichage de l\'accueil (%s) : %d ms');
  }

  __logOut(){
    let browser = this.browser;
    browser.execute("document.querySelector('div.user-menu-content').style.setProperty('display', 'block', 'important');");
    browser.waitForElementVisible(this.struct.user.logout, 1000);
    browser.click(this.struct.user.logout);
  }

  __checkRessTabColors(){
    let site = this;
    let elts = this.struct;
    let filterSidebar = this.struct.common.elts.filterSidebar;
    let colors = this.colors;
    let browser = this.browser;
    let mainTab = this.struct.tabs.ressources;
    this.__goTo(elts.tabs.ressources);
    
    //// Sous-fonctions pour mutualiser le code ////
    var checkFiltersSideBar = function(subTab, checkSideBarVisibility, checkHeader){
      //////
      var checkFiltersSection = function(subTab, section, sectionColors){
        var openFilter = !section.opened;
        var filtre = ' du filtre "'+section.label+'"';
        var bclass = section.blockClass;
        //var tpl = site.elts.filters.filter_template;
        var tpl = new Filter(section.blockClass);
        browser.waitForElementPresent(tpl.puce, 10000, idt()+'Attente d\'affichage'+filtre);
        site.checkColor(tpl.puce, 'text', colors.filters.puces, 'Couleur de la puce/ouverture'+filtre);
        site.checkColor(tpl.background, 'bg', sectionColors.background, 'Couleur du fond de l\'en-tête'+filtre);
        site.checkColor(tpl.title, 'bg', sectionColors.background, 'Couleur du fond du titre de l\'en-tête'+filtre);
        site.checkColor(tpl.title, 'text', sectionColors.text, 'Couleur du titre de l\'en-tête'+filtre);
        site.checkColor(tpl.unselect, 'text', sectionColors.text, 'Couleur du texte de désélection'+filtre);
        //Ligne sélectionnable
        //On ouvre le filtre pour faire apparaître
        if(openFilter === true){
          var openElt = tpl.collapse;//tpl.collapse(bclass) //tpl.title(bclass)
          //browser.expect.element(openElt).to.be.present;
          browser.click(openElt, () => {console.log('Clic pour ouverture'+filtre+' ('+openElt+')');});
          browser.pause(1000);
        }
        browser.waitForElementPresent(tpl.item, 10000, idt()+'Vérification d\'une ligne NON cochée'+filtre);
        logIndent.Inc();
        var indent = idt();//'   - ';
        site.checkColor(tpl.itemCheckBox, 'text', colors.filters.item.unselected.checkbox, 'Couleur d\'une case à cocher d\'une ligne'+filtre);
        site.checkColor(tpl.itemTitle, 'text', colors.filters.item.unselected.text, 'Couleur de l\'intitulé d\'une ligne'+filtre);
        site.checkColor(tpl.itemCount, 'bg', colors.filters.item.unselected.count.background, 'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
        site.checkColor(tpl.itemCount, 'text', colors.filters.item.unselected.count.text, 'Couleur du nombre de résultats d\'une ligne'+filtre);
        logIndent.Dec();
        
        //Ligne sélectionnée
        browser.click(tpl.itemCheckBox);
        browser.pause(1000);
        //browser.waitForElementVisible(tpl.item(bclass), 1000, idt()+'Vérification d\'une ligne cochée'+filtre);
        browser.waitForElementVisible(subTab.ligneRess.tag, 10000, idt()+'Vérification d\'une ligne cochée'+filtre);
        //TODO vérification de l'affichage d'un ressource
        /*
        ress_template : {
          container : function(ressTag) { return ressTag},
          cover : function(ressTag) { return this.container(ressTag) + ' div.cover'},
          infos : function(ressTag) { return this.container(ressTag) + ' div.infos'},
          title : function(ressTag) { return this.infos(ressTag) + ' .title'},
          metas : function(ressTag) { return this.container(ressTag) + ' div.metas div.meta'},
          actions : function(ressTag) { return this.container(ressTag) + ' div.actions'},
          fav : function(ressTag) { return this.actions(ressTag) + ' .action.favorite i.fa-star-o'},
          preview : function(ressTag) { return this.container(ressTag) + ' .action.lo-preview'},
          infos_popup : function(ressTag) { return this.container(ressTag) + ' .action.lo-edit-meta2'},
          add : function(ressTag) { return this.container(ressTag) + ' .actions.lo-add'},
        },
        */
        logIndent.Inc();
        site.checkColor(tpl.itemCheckBox, 'text', colors.filters.item.selected.checkbox, 'Couleur d\'une case cochée d\'une ligne'+filtre);
        site.checkColor(tpl.itemTitle, 'text', colors.filters.item.selected.text, 'Couleur de l\'intitulé d\'une ligne'+filtre);
        site.checkColor(tpl.itemCount, 'bg', colors.filters.item.selected.count.background, 'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
        site.checkColor(tpl.itemCount, 'text', colors.filters.item.selected.count.text, 'Couleur du nombre de résultats d\'une ligne'+filtre);
        browser.click(tpl.itemCheckBox);
        //browser.waitForElementVisible(tpl.itemCheckBoxOff, 2000, 'Attente de désélection de la ligne');
        //browser.pause(10000);
        browser.pause(1000);
        browser.waitForElementVisible(subTab.ligneRess.tag, 10000, idt()+'Attente de désélection de la ligne');
        //On referme le filtre pour revenir à l'état initial
        if(openFilter === true){
          browser.click(tpl.collapse, () => {console.log('Clic pour fermeture'+filtre+' ('+tpl.collapse+')');});
          browser.pause(1000);
        }
        logIndent.Dec();
      }
      //////
      if(checkSideBarVisibility === true){
        browser.waitForElementVisible(filterSidebar.sidebar, 2000, idt()+'Attente d\'apparition des filtres');
      }
      if(checkHeader === true){
        site.checkColor(filterSidebar.sidebar, 'bg', colors.filters.header.background, 'Couleur du fond de l\'en-tête des filtres');
        site.checkColor(filterSidebar.sidebar, 'text', colors.filters.header.text, 'Couleur du texte de l\'en-tête des filtres');
      }
      checkFiltersSection(subTab, filterSidebar.filters.discipline, colors.filters.discipline);
      checkFiltersSection(subTab, filterSidebar.filters.dominante, colors.filters.dominante);
      checkFiltersSection(subTab, filterSidebar.filters.niveau, colors.filters.niveau);
    }
    var checkBtnCreate = function(){
      let btnNouvSeance = mainTab.list_header.btnNouvSeance;
      site.checkColor(btnNouvSeance, 'bg', colors.activeColor, 'Couleur du fond du bouton "Créer une séance"');
      site.checkColor(btnNouvSeance, 'text', colors.buttons.default.text, 'Couleur du texte du bouton "Créer une séance"');
      browser.verify.containsText(btnNouvSeance, btnNouvSeance.label, idt()+'Vérification du texte du bouton "'+btnNouvSeance.label+'"');
    }
    var checkRessSubTab = function(subTab, checkFilters, checkFiltersHeader){
      if(subTab === undefined){
        return;
      }
      browser.waitForElementPresent(subTab.selector, 1000, idt()+'Clic sur l\'onglet "'+subTab.label+'"');
      logIndent.Inc();
      browser.click(subTab.selector);
      browser.waitForElementNotPresent(mainTab.waitMsg, 30000, idt()+'Attente de disparition du message d\'attente de chargement');
      if(checkFilters === true){
        checkFiltersSideBar(subTab, true, checkFiltersHeader);
      }
      checkBtnCreate();
      logIndent.Dec();
    }
    ////
    
    //Ex / Doc : 
    logIndent.Inc();
    browser.waitForElementVisible(filterSidebar.sidebar, 2000, logIndent.indentStr(mainTab.label)+' (Attente d\'apparition des filtres)');
    logIndent.Inc();
    var header = mainTab.list_header;
    browser.waitForElementVisible(header.container, 2000, logIndent.indentStr('Vérification de la barre supérieure'));
    logIndent.Inc();
    this.checkColor(header.container, 'bg', misc.colorFromHex('#34495e'), 'Couleur de fond du bandeau supérieur');
    this.checkColor(header.search.ico, 'color', misc.colorFromHex('#2C3E50'), 'Couleur de l\'icone de recherche');
    this.checkColor(header.search.input, 'bg', misc.colorFromHex('#fff'), 'Couleur du fond de la zone de recherche');
    this.checkColor(header.search.input, 'text', misc.colorFromHex('#1a2930'), 'Couleur du texte de la zone de recherche');
    this.checkColor(header.favorites_toggle, 'text', misc.colorFromHex('#fff'), 'Couleur du texte "Afficher les favoris"');
    logIndent.Dec();
    
    this.checkColor(mainTab.tabsCont, 'bg', misc.colorFromHex('#E8E8E8'), 'Couleur fond du bandeau "Exercices / Séances / Séances partagées"');
    this.checkColor(mainTab.tabSelected, 'text', misc.colorFromHex('#2C3E50'), 'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
    this.checkColor(mainTab.tabUnselected, 'text', misc.colorFromHex('#2C3E50'), 'Couleur du texte désélectionné du bandeau "Exercices / Séances / Séances partagées"');
    checkRessSubTab(mainTab.tabExosDocs, true, true);
    //Séances
    checkRessSubTab(mainTab.tabSeances, false, false);
  
    //Séances partagées
    checkRessSubTab(mainTab.tabSeancesPart, false, false);
  
    logIndent.Dec();
    logIndent.Dec();
  }
  ////  FIN Fonction __ = Fonctions utilitaires "protected"  ////
  
  /**
   * Génération de l'objet NodeJS à utiliser par Nightwatch (module.exports = xxx.genNodeExport();)
   */
  genNodeExport(){
    let fctPrefix = function(inc){
      if(inc !== false){
        fctNum++;
      }
      return misc.zeroPad(fctNum, 2)+'-';
    }
    let site = this;
    let njsExp = {};
    let fctNum =  0;
    njsExp[fctPrefix()+'Authentification'] = function(browser){
      site.init(browser);
      site.login();
    };

    njsExp[fctPrefix()+'Vérification des couleurs'] = function(browser) {
        ////  ACCUEIL  ////
        site.checkColors();
      };
    
    njsExp.after = function(browser) {
        if(browser.options.desiredCapabilities.browserName == 'MicrosoftEdge'){
          browser.click(site.elts.user.logout);
          browser.deleteCookies(function() {
            console.log('Suppression des cookies pour Edge');
          });
        }
        console.log('Closing down...');
        browser.end();
      };
    return njsExp;
  }

}

export default SiteTemplate;







class ContentLine {
  constructor(htmlTag) {
    this.tag = htmlTag;
    this.container = this.tag;
    this.cover = this.container + ' div.cover';
    this.infos = this.container + ' div.infos';
    this.title = this.infos + ' .title';
    //author : function(ressTag) { return this.infos(ressTag) + ' .author'},
    //description : function(ressTag) { return this.infos(ressTag) + ' .description'},
    this.metas = this.containe + ' div.metas div.meta';
    this.actions = this.container + ' div.actions';
    this.fav = this.actions+ ' .action.favorite i.fa-star-o';
    //preview : function(ressTag) { return this.container(ressTag) + ' .action.lo-preview'},
    //infos_popup : function(ressTag) { return this.container(ressTag) + ' .action.lo-edit-meta2'},
    //add : function(ressTag) { return this.container(ressTag) + ' .action.lo-add'},
    
    //diff avec learning-object
    //infos_popup_mod : function(ressTag) { return this.container(ressTag) + ' .action .fa-stack-2x'},
    //webreader : function(ressTag) { return this.container(ressTag) + ' .webreader a'},
    //todo
    //more_actions : function(ressTag) { return this.container(ressTag) + ' div.dropdown-actions'},
  }
}
class RessLine extends ContentLine {
  constructor() {
    super('learning-object');
    this.preview = this.container + ' .action.lo-preview';
    this.infos_popup = this.container + ' .action.lo-edit-meta2';
    this.add = this.container + ' .action.lo-add';
  }
}
class SeanceLine extends ContentLine {
  constructor() {
    super('module');
    this.infos_popup = this.container + ' .action .fa-stack-2x';
    //infos_popup_mod : function(ressTag) { return this.container(ressTag) + ' .action .fa-stack-2x'},
    this.webreader = this.container + ' .webreader a';
    //todo
    this.more_actions = this.container + ' div.dropdown-actions .dropdown-handler i';
    this.actions_menu = this.container + ' div.dropdown-menu';
  }
}
