var misc = require('../helpers/misc.js');
var logIndent = require('../helpers/LogIndent.js');
//Fonction au nom très court pour une utilisation plus rapide dans le code de LogIndent
var idt = function(){ return logIndent.indentStr();}

class SiteTemplate{
  constructor() {
    //this.id = id;
    //this.url = url;
    this.elts = {};
    this.colors = {};
    this.accounts = {};
    this.browser = null;
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
    this.browser.verify.cssProperty(elt, testProp, color.cssString(this.browser), msg);
  }
  
  login() {
    let browser = this.browser;
    browser
      .url(this.url)
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#gt-placeholder-0', 15000);
    
    //Je n'arrive pas à trouver la couleur du texte dans le place-holder
    //browser.verify.cssProperty('#gt-placeholder-7', 'background-color', 'rgb('+selColor.r+', '+selColor.g+', '+selColor.b+')', 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
    this.checkColor(this.elts.buttons.loginPage.register, 'bg', this.colors.buttons.secondary.background, 'Vérification de la couleur du fond du bouton "S\'enregistrer"');

    browser.verify.cssProperty(this.elts.buttons.loginPage.register, 'background-color', this.colors.buttons.secondary.background.cssString(browser), 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.register, 'color', this.colors.buttons.secondary.text.cssString(browser), 'Vérification de la couleur du texte du bouton "S\'enregistrer"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.login, 'background-color', this.colors.buttons.default.background.cssString(browser), 'Vérification de la couleur du fond du bouton "Se connecter"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.login, 'color', this.colors.buttons.default.text.cssString(browser), 'Vérification de la couleur du texte du bouton "Se connecter"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.pwdLost, 'color', this.colors.activeColor.cssString(browser), 'Vérification de la couleur du texte "Mot de passe oublié ?"');
    
    logIn(this, true);
  }

  //'Vérification des couleurs'(browser) {
  checkColors() {
      let browser = this.browser;
        //home(browser);
      ////  ACCUEIL  ////
      //browser.verify.cssProperty('.menu-item.active a', 'color', this.colors.activeColor.cssString(browser), 'Couleur du texte de l\'onglet actif');
      //browser.verify.cssProperty('.menu-item:not(.active) a', 'color', this.colors.inactiveColor.cssString(browser), 'Couleur du texte d\'un onglet inactif');
      
      //Pseudo élément => Element inexistant dans le DOM et donc non testable ici
      //browser.verify.cssProperty('div.user-menu::after', 'border-color', colors.activeColor.cssString(browser), 'Couleur du triangle d\'ouverture "Utilisateur"');
      browser.verify.cssProperty(this.elts.user.myProfile, 'color', this.colors.activeColor.cssString(browser), 'Couleur du texte "Mon profil"');
      browser.verify.cssProperty(this.elts.user.logout, 'color', this.colors.activeColor.cssString(browser), 'Couleur du texte "Se déconnecter"');
  
      ////  RESSOURCES  ////
      checkRessTabColors(this);

      this.checkColor('.menu-item.active a', 'text', this.colors.activeColor, 'Couleur du texte de l\'onglet actif');
      this.checkColor('.menu-item:not(.active) a', 'text', this.colors.inactiveColor, 'Couleur du texte de l\'onglet inactif');
      //browser.verify.cssProperty('.menu-item.active a', 'color', this.colors.activeColor.cssString(browser), 'Couleur du texte de l\'onglet actif');
      //browser.verify.cssProperty('.menu-item:not(.active) a', 'color', this.colors.inactiveColor.cssString(browser), 'Couleur du texte d\'un onglet inactif');
      
  }
  

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



function home(site){
  site.browser.click(site.elts.tabs.home);
  site.browser.pause(500);
}

function goTo(site, cssDest){
  home(site);
  site.browser.click(cssDest.hasOwnProperty('selector') ? cssDest.selector : cssDest);
}

function logIn(site, useEnterKey){
  let browser = site.browser;
  browser.waitForElementVisible('input[ng-model="LoginCtrl.email"]', 5000, 'Attente d\'affichage de la page de connexion');
  browser.setValue('#gt-placeholder-0', site.accounts.prof.login);
  if(useEnterKey === true){
    browser.setValue('#gt-placeholder-1', [site.accounts.prof.password, browser.Keys.ENTER]);
  }
  else{
    browser.setValue('#gt-placeholder-1', site.accounts.prof.password);
    browser.click(site.elts.buttons.submit);
  }
  browser.waitForElementVisible(site.elts.tabs.home, 10000, 'Attente d\'affichage de l\'accueil (%s) : %d ms');
}

function logOut(site){
  let browser = site.browser;
  browser.execute("document.querySelector('div.user-menu-content').style.setProperty('display', 'block', 'important');");
  browser.waitForElementVisible(site.elts.user.logout, 1000);
  browser.click(site.elts.user.logout);
}


function checkRessTabColors(site){
  var elts = site.elts;
  var colors = site.colors;
  var browser = site.browser;
  var mainTab = elts.tabs.ressources;
  goTo(site, mainTab);
  
  //// Sous-fonctions pour mutualiser le code ////
  var checkFiltersSideBar = function(subTab, checkSideBarVisibility, checkHeader){
    //////
    var checkFiltersSection = function(subTab, section, sectionColors){
      var openFilter = !section.opened;
      var filtre = ' du filtre "'+section.label+'"';
      var bclass = section.blockClass;
      var tpl = site.elts.filters.filter_template;
      browser.waitForElementPresent(tpl.puce(bclass), 10000, idt()+'Attente d\'affichage'+filtre);
      browser.verify.cssProperty(tpl.puce(bclass), 'color', colors.filters.puces.cssString(browser), idt()+'Couleur de la puce/ouverture'+filtre);
      browser.verify.cssProperty(tpl.background(bclass), 'background-color', sectionColors.background.cssString(browser), idt()+'Couleur du fond de l\'en-tête'+filtre);
      browser.verify.cssProperty(tpl.title(bclass), 'background-color', sectionColors.background.cssString(browser), idt()+'Couleur du fond du titre de l\'en-tête'+filtre);
      browser.verify.cssProperty(tpl.title(bclass), 'color', sectionColors.text.cssString(browser), idt()+'Couleur du titre de l\'en-tête'+filtre);
      browser.verify.cssProperty(tpl.unselect(bclass), 'color', sectionColors.text.cssString(browser), idt()+'Couleur du texte de désélection'+filtre);
      //Ligne sélectionnable
      //On ouvre le filtre pour faire apparaître
      if(openFilter === true){
        var openElt = tpl.collapse(bclass);//tpl.collapse(bclass) //tpl.title(bclass)
        //browser.expect.element(openElt).to.be.present;
        browser.click(openElt, () => {console.log('Clic pour ouverture'+filtre+' ('+openElt+')');});
        browser.pause(1000);
      }
      browser.waitForElementPresent(tpl.item(bclass), 10000, idt()+'Vérification d\'une ligne NON cochée'+filtre);
      logIndent.Inc();
      var indent = idt();//'   - ';
      browser.verify.cssProperty(tpl.itemCheckBox(bclass), 'color', colors.filters.item.unselected.checkbox.cssString(browser), indent+'Couleur d\'une case à cocher d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemTitle(bclass), 'color', colors.filters.item.unselected.text.cssString(browser), indent+'Couleur de l\'intitulé d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemCount(bclass), 'background-color', colors.filters.item.unselected.count.background.cssString(browser), indent+'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemCount(bclass), 'color', colors.filters.item.unselected.count.text.cssString(browser), indent+'Couleur du nombre de résultats d\'une ligne'+filtre);
      logIndent.Dec();
      
      //Ligne sélectionnée
      browser.click(tpl.itemCheckBox(bclass));
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
      browser.verify.cssProperty(tpl.itemCheckBox(bclass), 'color', colors.filters.item.selected.checkbox.cssString(browser), indent+'Couleur d\'une case cochée d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemTitle(bclass), 'color', colors.filters.item.selected.text.cssString(browser), indent+'Couleur de l\'intitulé d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemCount(bclass), 'background-color', colors.filters.item.selected.count.background.cssString(browser), indent+'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemCount(bclass), 'color', colors.filters.item.selected.count.text.cssString(browser), indent+'Couleur du nombre de résultats d\'une ligne'+filtre);
      browser.click(tpl.itemCheckBox(bclass));
      //browser.waitForElementVisible(tpl.itemCheckBoxOff(bclass), 2000, 'Attente de désélection de la ligne');
      //browser.pause(10000);
      browser.pause(1000);
      browser.waitForElementVisible(subTab.ligneRess.tag, 10000, idt()+'Attente de désélection de la ligne');
      //On referme le filtre pour revenir à l'état initial
      if(openFilter === true){
        browser.click(tpl.collapse(bclass), () => {console.log('Clic pour fermeture'+filtre+' ('+tpl.collapse(bclass)+')');});
        browser.pause(1000);
      }
      logIndent.Dec();
    }
    //////
    if(checkSideBarVisibility === true){
      browser.waitForElementVisible(elts.filters.sidebar, 2000, idt()+'Attente d\'apparition des filtres');
    }
    if(checkHeader === true){
      browser.verify.cssProperty(elts.filters.sidebar, 'background-color', colors.filters.header.background.cssString(browser), idt()+'Couleur du fond de l\'en-tête des filtres');
      browser.verify.cssProperty(elts.filters.sidebar, 'color', colors.filters.header.text.cssString(browser), idt()+'Couleur du texte de l\'en-tête des filtres');
    }
    checkFiltersSection(subTab, elts.filters.discipline, colors.filters.discipline);
    checkFiltersSection(subTab, elts.filters.dominante, colors.filters.dominante);
    checkFiltersSection(subTab, elts.filters.niveau, colors.filters.niveau);
  }
  var checkBtnCreate = function(){
    browser.verify.cssProperty(mainTab.list_header.btnNouvSeance, 'background-color', colors.activeColor.cssString(browser), idt()+'Couleur du fond du bouton "Créer une séance"');
    browser.verify.cssProperty(mainTab.list_header.btnNouvSeance, 'color', colors.buttons.default.text.cssString(browser), idt()+'Couleur du texte du bouton "Créer une séance"');
    browser.verify.containsText(mainTab.list_header.btnNouvSeance, 'CRÉER UNE SÉANCE', idt()+'Vérification du texte du bouton "Créer une séance"');
  }
  var checkRessSubTab = function(subTab, checkFilters, checkFiltersHeader){
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
  browser.waitForElementVisible(elts.filters.sidebar, 2000, logIndent.indentStr(mainTab.label)+' (Attente d\'apparition des filtres)');
  logIndent.Inc();
  var header = mainTab.list_header;
  browser.verify.cssProperty(header.container, 'background-color', misc.colorFromHex('#34495e').cssString(browser), idt()+'Couleur fond du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(header.search.ico, 'color', misc.colorFromHex('#2C3E50').cssString(browser), idt()+'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(header.search.input, 'background-color', misc.colorFromHex('#fff').cssString(browser), idt()+'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(header.search.input, 'color', misc.colorFromHex('#1a2930').cssString(browser), idt()+'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
  //header.search.placeholder = pseudo-classe inaccessible ?
  browser.verify.cssProperty(header.favorites_toggle, 'color', misc.colorFromHex('#fff').cssString(browser), idt()+'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
  
  browser.verify.cssProperty(mainTab.tabsCont, 'background-color', misc.colorFromHex('#E8E8E8').cssString(browser), idt()+'Couleur fond du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(mainTab.tabSelected, 'color', misc.colorFromHex('#2C3E50').cssString(browser), idt()+'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(mainTab.tabUnselected, 'color', misc.colorFromHex('#2C3E50').cssString(browser), idt()+'Couleur du texte désélectionné du bandeau "Exercices / Séances / Séances partagées"');
  checkRessSubTab(mainTab.tabExosDocs, true, true);
  //mainTab.tabExosDocs.ligneRess.tag
  //Séances
  checkRessSubTab(mainTab.tabSeances, false, false);

  //Séances partagées
  checkRessSubTab(mainTab.tabSeancesPart, false, false);

  logIndent.Dec();
  logIndent.Dec();
}