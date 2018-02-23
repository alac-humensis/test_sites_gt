import { GtLMSStructure } from "./structure/site_structure";
import { colorFromHex } from "../helpers/color";
import { Filter } from "./structure/filter";
import { NightwatchBrowser } from "../nightwatch";
import { zeroPad } from "../helpers/misc";
import { GtLMSColors } from "./structure/site_colors";
import { BasicAccessor } from "./structure/basic_accessor";
import { LogIndent } from "../helpers/LogIndent";
import { NightwatchTestManager } from "./test_cases/test_manager";
import { TestLogin } from "./test_cases/test_login";
import { GtLMSTabs, GtLMSTab } from "./structure/main_page";
import { TestTabRessources } from "./test_cases/test_tab_ressources";

/*
var logIndent = require('../helpers/LogIndent.js');
//Fonction au nom très court pour une utilisation plus rapide de LogIndent dans le code
var idt = function(){ return logIndent.indentStr();}
*/

//import GtSiteStructure from './ui_accessors/site_structure.mjs';
//import Filter from './ui_accessors/filter.mjs';

/*
élément inaccessible pour le moment (exclu de this.struct pour améliorer la lisibilité :
  {
        home : {
          cards : {
            number_1 : {
              num : '1',
              pastille : colorFromHex('#e10d7d'),
              button : {
                background : colorFromHex('#e10d7d'),
                text : lightText
              }
            },
            number_2 : {
              num : '2',
              pastille : colorFromHex('#632682'),
              button : {
                background : colorFromHex('#632682'),
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
              pastille : colorFromHex('#2e3364'),
              button : {
                background : colorFromHex('#2e3364'),
                text : lightText
              }
            }
          }
        }
  }
*/

export class TestContext{
  browser: NightwatchBrowser = null;
  logIndent: LogIndent = new LogIndent();
}

export abstract class GtLMSSite{
  accounts: GtLMSAccountList;
  struct: GtLMSStructure;
  colors: GtLMSColors;

  testContext: TestContext;
  testMng: NightwatchTestManager;

  constructor() {
    this.colors = new GtLMSColors();
    this.struct = new GtLMSStructure(this);
    this.accounts = new GtLMSAccountList();
    this.testContext = new TestContext();
    this.testMng = new NightwatchTestManager(this);
    this.initColors();
    this.initFilters();
    this.initTabs();
    this.initAccounts();
  }
  
  ////  Méthodes et Accesseurs à surcharger dans les classes filles  ////
  abstract get siteName();

  /** 
   * Init 01 - Initialize all common colors used by many elements. Specific / unique colors can be set directly in the structure elements (cf this.struct and BasicAccessor class)
  */
  abstract initColors();
  
  /** 
   * Init 02 - Add this site's specific filters to this.struct.filterSidebar.filters array
  */
  abstract initFilters();

  /** 
   * Init 03 - Enable or not the site's tabs and their sub elements colors
  */
  abstract initTabs();
  
  /** 
   * Init 04 - Fill teacher end pupil info (url, login, password)
  */
  abstract initAccounts();
  ////  FIN Méthodes et Accesseurs à surcharger dans les classes filles  ////

  init(browser: NightwatchBrowser) {
    this.testContext.browser = browser;
    browser
      .url('https://www.google.fr')
      .waitForElementVisible('body', 5000, true, undefined, 'Navigateur '+browser.options.desiredCapabilities.browserName);
  }

  get browser(): NightwatchBrowser{
    return this.testContext.browser;
  }
  get logIdt(): LogIndent{
    return this.testContext.logIndent;
  }
  idt(logIndentTitle?: string): string{
    return this.testContext.logIndent.indentStr(logIndentTitle);
  }

  /**
   * Fonction pour vérifier une couleur d'un élément du DOM
   * @param elt Sélecteur CSS
   * @param cssProp Propriété CSS à vérifier. N.B : possible d'indiquer bg ou txt/text pour plus de simplicité
   * @param color Objet Couleur au format colorFromHex
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
    this.browser.verify.cssProperty(this.__cssDest(elt), testProp, color.cssString(this.browser), (msg !== undefined ? this.idt()+msg : msg));
  }

  /**
   * Lancement de la vérification du texte et des couleurs pour tous les éléments passés en paramètres
   * @param eltsArray {Array<BasicAccessor>} Tableau d'éléments à vérifier
   */
  checkElements(eltsArray: Array<BasicAccessor>){
    eltsArray.forEach( (elt: BasicAccessor, index: number) => {
        elt.checkAllProperties(this.testContext);
      }
    );
  }

  //'Vérification des couleurs'(browser) {
  checkColors() {
    /* TODO
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
      */
  }
  

  ////  Fonction __ = Fonctions utilitaires "protected"  ////
  __cssDest(elt){
    return elt.hasOwnProperty('selector') ? elt.selector : elt;
  }
  home(){
    this.browser.click(this.struct.tabs.home.selector);
    this.browser.pause(500);
  }

  __goTo(cssDest){
    this.home();
    this.browser.click(cssDest.hasOwnProperty('selector') ? cssDest.selector : cssDest);
  }

  selectTab(destTab: GtLMSTab){
    this.home();
    this.browser.click(destTab.selector);
  }
  /* TODO
  __checkRessTabColors(){
    let site = this;
    let elts = this.struct;
    let filterSidebar = this.struct.filterSidebar;
    let colors = this.colors;
    let browser = this.browser;
    let mainTab = this.struct.tabs.ressources;
    this.__goTo(elts.tabs.ressources);
    
    //// Sous-fonctions pour mutualiser le code ////
    var checkFiltersSideBar = function(subTab, checkSideBarVisibility, checkHeader){
      //////
      var checkFiltersSection = function(subTab, section: Filter, sectionColors){
        var openFilter = !section.opened;
        var filtre = ' du filtre "'+section.text+'"';
        var bclass = section.blockClass;
        //var tpl = site.elts.filters.filter_template;
        var tpl = new Filter(this.sidebar, section.blockClass, );
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
    this.checkColor(header.container, 'bg', colorFromHex('#34495e'), 'Couleur de fond du bandeau supérieur');
    this.checkColor(header.search.ico, 'color', colorFromHex('#2C3E50'), 'Couleur de l\'icone de recherche');
    this.checkColor(header.search.input, 'bg', colorFromHex('#fff'), 'Couleur du fond de la zone de recherche');
    this.checkColor(header.search.input, 'text', colorFromHex('#1a2930'), 'Couleur du texte de la zone de recherche');
    this.checkColor(header.favorites_toggle, 'text', colorFromHex('#fff'), 'Couleur du texte "Afficher les favoris"');
    logIndent.Dec();
    
    this.checkColor(mainTab.tabsCont, 'bg', colorFromHex('#E8E8E8'), 'Couleur fond du bandeau "Exercices / Séances / Séances partagées"');
    this.checkColor(mainTab.tabSelected, 'text', colorFromHex('#2C3E50'), 'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
    this.checkColor(mainTab.tabUnselected, 'text', colorFromHex('#2C3E50'), 'Couleur du texte désélectionné du bandeau "Exercices / Séances / Séances partagées"');
    checkRessSubTab(mainTab.tabExosDocs, true, true);
    //Séances
    checkRessSubTab(mainTab.tabSeances, false, false);
  
    //Séances partagées
    checkRessSubTab(mainTab.tabSeancesPart, false, false);
  
    logIndent.Dec();
    logIndent.Dec();
  }
  */
  ////  FIN Fonction __ = Fonctions utilitaires "protected"  ////
  
  /**
   * Génération de l'objet NodeJS à utiliser par Nightwatch (module.exports = xxx.genNodeExport();)
   */
  genNodeExport(){
    this.testMng.tests.push(new TestLogin(this));
    this.testMng.tests.push(new TestTabRessources(this));
    return this.testMng.genNodeExport();
  }

}

class GtLMSAccountList{
  prof : GtLMSAccount = new GtLMSAccount();
  eleve : GtLMSAccount = new GtLMSAccount();
}
export class GtLMSAccount{
  url : string;
  login : string;
  password : string;
}