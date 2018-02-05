var misc = require('../src/helpers/misc.js');

var logCtx = {
  indentLevel = 0,
  indentStr: function(logIndentTitle) {
    var indentFull = '';
    if(this.indentLevel > 0){
      var indentSpace = '  ';
      var indentTags = ['##', '+', '-', '°'];
      for(var i=1; i<this.indentLevel; i++){
        indentFull += indentSpace;
      }
      indentFull += indentTags[Math.min(this.indentLevel-1, indentTags.length-1)];
    }
    indentFull += ' ';
    if(logIndentTitle != undefined){
      indentFull += logIndentTitle;
    }
    return indentFull;
  },
  Inc: function(){this.indentLevel++;},
  Dec: function(){this.indentLevel--;}
}
//Fonction au nom très court pour une utilisation plus rapide dans le code
var idt = function(){ return logCtx.indentStr();}

/**
 * Ensemble de sélecteurs permettant de naviguer dans la digithèque
 */
var elts = {
  tabs: {
    home : 'div.institution-infos img',
    ressources: {
      selector : 'a[ui-sref="app.resources"]',
      label : 'Ressources',
      btnNouvSeance : 'button.new-module',
      tabsCont : 'div.gt-tabs-menu',
      tabSelected : 'div.gt-tabs-menu__item--active',
      tabUnselected : 'div.gt-tabs-menu__item:not(.gt-tabs-menu__item--active)',
      tabExosDocs : {
        selector : 'div[ui-sref="app.resources"]',
        label : 'Exercices/Documents'
      },
      tabSeances : {
        selector : 'div[ui-sref="app.resources.modules"]',
        label : 'Séances'
      },
      tabSeancesPart : {
        selector : 'div[ui-sref="app.resources.shared"]',
        label : 'Séances partagées'
      },
      ligneRess : 'learning-object',
      waitMsg : 'div.gt-loader'
    },
    mesRessources: 'a[ui-sref="app.library"]',
    seances: 'a[ui-sref="app.assignements"]',
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
    filter_template : {
      //rep : '#SPEC_CLASS#',
      bloc: function(blockClass) { return 'div.gt-meta-filter-bloc.'+blockClass},
      background: function(blockClass) { return this.bloc(blockClass)+' div.gt-meta-filter-name'},
      title: function(blockClass) { return this.bloc(blockClass)+' div.title'},
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

var colors = {
  placeholderText : misc.colorFromHex('#6F7780'),
  activeColor : misc.colorFromHex('#E60077'),
  inactiveColor : misc.colorFromHex('#6C797A'),
  filters : {
    puces : misc.colorFromHex('#0298ca'),
    item : {
      unselected :{
        checkbox : misc.colorFromHex('#e8e8e8'),
        text : misc.colorFromHex('#2c3e50'),
        count : {
          background : misc.colorFromHex('#757575'),
          text : misc.colorFromHex('#fff')
        }
      },
      selected :{
        checkbox : misc.colorFromHex('#0298ca'),
        text : misc.colorFromHex('#0298ca'),
        count : {
          background : misc.colorFromHex('#0298ca'),
          text : misc.colorFromHex('#fff')
        }
      }
    },
    header : {
      background : misc.colorFromHex('#0298CA'),
      text : misc.colorFromHex('#FFF')
    },
    discipline : {
      background : misc.colorFromHex('#2c3e50'),//actuellement #34495e
      text : misc.colorFromHex('#FFF')
    },
    dominante : {
      background : misc.colorFromHex('#e8e8e8'),
      text : misc.colorFromHex('#6e6e6e')
    },
    niveau : {
      background : misc.colorFromHex('#34495e'),
      text : misc.colorFromHex('#FFF')
    }
  },
  buttons : {
    default : {
      background : misc.colorFromHex('#E60077'),
      text : misc.colorFromHex('#FFF')
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
          text : misc.colorFromHex('#FFF')
        }
      },
      number_2 : {
        num : '2',
        pastille : misc.colorFromHex('#632682'),
        button : {
          background : misc.colorFromHex('#632682'),
          text : misc.colorFromHex('#FFF')
        }
      },
      number_3 : {
        num : '3',
        pastille : misc.colorFromHex('#0298CA'),
        button : {
          background : misc.colorFromHex('#0298CA'),
          text : misc.colorFromHex('#FFF')
        }
      },
      number_4 : {
        num : '4',
        pastille : misc.colorFromHex('#2e3364'),
        button : {
          background : misc.colorFromHex('#2e3364'),
          text : misc.colorFromHex('#FFF')
        }
      }
    }
  }
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
function goTo(browser, cssDest){
  home(browser);
  browser.click(cssDest.hasOwnProperty('selector') ? cssDest.selector : cssDest);
}
function logIn(browser, useEnterKey){
  browser.waitForElementVisible('input[ng-model="LoginCtrl.email"]', 5000, 'Attente d\'affichage de la page de connexion');
  browser.setValue('#gt-placeholder-0', 'alexandre.lac@editions-belin.fr');
  if(useEnterKey === true){
    browser.setValue('#gt-placeholder-1', ['Digitest', browser.Keys.ENTER]);
  }
  else{
    browser.setValue('#gt-placeholder-1', 'Digitest');
    browser.click(elts.buttons.submit);
  }
  browser.waitForElementVisible(elts.tabs.home, 10000, 'Attente d\'affichage de l\'accueil (%s) : %d ms');
}
function logOut(browser){
  browser.execute("document.querySelector('div.user-menu-content').style.setProperty('display', 'block', 'important');");
  browser.waitForElementVisible(elts.user.logout, 1000);
  browser.click(elts.user.logout);
}

module.exports = {
    
    'Digitheque Login' : function (browser) {
      browser
        .url('http://enseignant.digitheque-belin.fr')
        .waitForElementVisible('body', 5000)
        .waitForElementVisible('#gt-placeholder-0', 5000);
      
      //Je n'arrive pas à trouver la couleur du texte dans le place-holder
      //browser.verify.cssProperty('#gt-placeholder-7', 'background-color', 'rgb('+selColor.r+', '+selColor.g+', '+selColor.b+')', 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
      browser.verify.cssProperty(elts.buttons.loginPage.register, 'background-color', colors.buttons.secondary.background.cssString(browser), 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
      browser.verify.cssProperty(elts.buttons.loginPage.register, 'color', colors.buttons.secondary.text.cssString(browser), 'Vérification de la couleur du texte du bouton "S\'enregistrer"');
      browser.verify.cssProperty(elts.buttons.loginPage.login, 'background-color', colors.buttons.default.background.cssString(browser), 'Vérification de la couleur du fond du bouton "Se connecter"');
      browser.verify.cssProperty(elts.buttons.loginPage.login, 'color', colors.buttons.default.text.cssString(browser), 'Vérification de la couleur du texte du bouton "Se connecter"');
      browser.verify.cssProperty(elts.buttons.loginPage.pwdLost, 'color', colors.activeColor.cssString(browser), 'Vérification de la couleur du texte "Mot de passe oublié ?"');
      
      /*
      browser.setValue('#gt-placeholder-0', 'alexandre.lac@editions-belin.fr')
        .setValue('#gt-placeholder-1', ['Digitest', browser.Keys.ENTER]);
        //.click('button[type=submit]')
        //.assert.containsText('#main', 'Night Watch')
        //.expect.element('#main').text.to.not.contain('The Night Watch');
      
      browser.waitForElementVisible(elts.tabs.home, 10000);
      browser.click('div.user-menu-content');
      browser.click(elts.user.logout);
      */
      logIn(browser, true);
      //logOut(browser);//TODO : A REMETTRE
      //logIn(browser, false);//TODO : A REMETTRE
      
      /*
        browser.expect.element('.home-banner');
        browser.expect.element('.home-banner').to.be.present;
        browser.waitForElementVisible('body>div:first-child', 10000);
        browser.expect.element('body>div:first-child').to.have.css('background-color', 'Test de le couleur de bandeau').which.equals('#e10d7d');
        browser.expect.element('body>div:first-child').to.have.css('background-color', 'Test RGB de le couleur de bandeau').which.equals('rgb(225, 13, 125)');
        browser.expect.element('#main').to.not.be.present;
        */
    },

    'Vérification des couleurs' : function(browser) {
      home(browser);
      var checkCard = function(card){
        browser.verify.cssProperty('#home-box-'+card.num+' .home-box-number', 'background-color', card.pastille.cssString(browser), 'Couleur de la pastille de la "carte '+card.num+'"');
        browser.verify.cssProperty('#home-box-'+card.num+' .home-box-bottom', 'background-color', card.button.background.cssString(browser), 'Couleur du bouton de la "carte '+card.num+'"');
        browser.verify.cssProperty('#home-box-'+card.num+' .home-box-bottom', 'color', card.button.text.cssString(browser), 'Couleur du texte du bouton de la "carte '+card.num+'"');
      }
      //"Cartes"
      /*
      //Je n'arrive pas à accéder à la deuxième iframe qui n'a pas d'id (sous #custom-iframe)
      //browser.execute("document.querySelector('#custom-iframe iframe').setAttribute('id', 'home-iframe');");
      browser.execute("document.querySelector('#custom-iframe').setAttribute('id2', 'home-iframe');");
      browser.crash();
      //browser.execute("document.querySelector('#custom-iframe').contentDocument.body.childNodes[0].setAttribute('id', 'home-iframe');");
      browser.frame('custom-iframe');
      browser.execute("document.querySelector('#custom-iframe').contentDocument.body.childNodes[0].setAttribute('id', 'home-iframe');");
      //browser.execute("document.querySelector('iframe').setAttribute('id', 'home-iframe');");
      browser.waitForElementVisible('#home-iframe', 5000);
      //browser.crash();
      browser.frame('home-iframe');
      
      checkCard(colors.home.cards.number_1);
      checkCard(colors.home.cards.number_2);
      checkCard(colors.home.cards.number_3);
      checkCard(colors.home.cards.number_4);
      
      browser.frameParent();
      browser.frameParent();
      */

      ////  ACCUEIL  ////
      browser.verify.cssProperty('.menu-item.active a', 'color', colors.activeColor.cssString(browser), 'Couleur du texte de l\'onglet actif');
      browser.verify.cssProperty('.menu-item:not(.active) a', 'color', colors.inactiveColor.cssString(browser), 'Couleur du texte d\'un onglet inactif');
      
      //Pseudo élément => Element inexistant dans le DOM et donc non testable ici
      //browser.verify.cssProperty('div.user-menu::after', 'border-color', colors.activeColor.cssString(browser), 'Couleur du triangle d\'ouverture "Utilisateur"');
      browser.verify.cssProperty(elts.user.myProfile, 'color', colors.activeColor.cssString(browser), 'Couleur du texte "Mon profil"');
      browser.verify.cssProperty(elts.user.logout, 'color', colors.activeColor.cssString(browser), 'Couleur du texte "Se déconnecter"');

      ////  RESSOURCES  ////
      checkRessTabColors(browser);
    },

    'Création de groupe' : function(browser) {
      home(browser);
      //browser.click('a[ui-sref="app.resources"]');
      //browser.click('a[ui-sref="app.groups"]');
      browser.click(elts.tabs.eleves);
      //browser.waitForElementVisible('button[ui-sref="app.groups.create"]', 2000);
      browser.waitForElementVisible(elts.buttons.eleves.btnCreerGpElv, 2000);
      browser.click(elts.buttons.eleves.btnCreerGpElv);
      browser.pause(3000);
      browser.click('div.gt-modal button.btn-cancel');
      //var now = new Date();
      //console.log('Jour : ' + (now.getDate().toString().padStart(2, '0')) );
      var now = misc.getDateStr();

      //Test de la couleur de sélection
      var selColor = misc.hexToRgb('#f2007d');//#e10d7d
      var cl = misc.colorFromHex('#E60077');
      //var selColor = misc.hexToRgb('#E60077');//#e10d7d
      //browser.expect.element('div.group-list-item.selected').to.have.css('background-color', 'Test de le couleur de sélection d\'un groupe').which.equals('rgb('+selColor.r+', '+selColor.g+', '+selColor.b+')');
      //browser.expect.element('div.group-list-item.selected').to.have.css('color', 'Test de le couleur du texte de sélection d\'un groupe').which.equals('rgb(255, 255, 255)');
      browser.waitForElementVisible('div.group-list-item.selected', 1000);
      browser.verify.cssProperty('div.group-list-item.selected', 'background-color', 'rgb('+selColor.r+', '+selColor.g+', '+selColor.b+')', 'Test de la couleur de sélection d\'un groupe');
      browser.verify.cssProperty('div.group-list-item.selected', 'background-color', cl.cssString(browser), 'Test 2 de la couleur de sélection d\'un groupe');
      browser.verify.cssProperty('div.group-list-item.selected', 'color', 'rgb(255, 255, 255)', 'Test de la couleur du texte de sélection d\'un groupe');
      //browser.expect.element('body>div:first-child').to.have.css('background-color', 'Test RGB de le couleur de bandeau').which.equals('rgb(225, 13, 125)');
    
      browser.pause(3000);
      //home(browser);
      //browser.pause(2500);
      //browser.click(elts.buttons.eleves.btnCreerGpElv);
    },

    after : function(browser) {
      if(browser.options.desiredCapabilities.browserName == 'MicrosoftEdge'){
        browser.click(elts.user.logout);
        browser.deleteCookies(function() {
          console.log('Suppression des cookies pour Edge');
        });
      }
      console.log('Closing down...');
      browser.end();
    },
  };

function checkRessTabColors(browser){
  var curTab = elts.tabs.ressources;
  goTo(browser, curTab);
  
  var checkFiltersSideBar = function(checkSideBarVisibility, checkHeader){
    var checkFiltersSection = function(section, sectionColors, openFilter){
      var filtre = ' du filtre "'+section.label+'"';
      var bclass = section.blockClass;
      var tpl = elts.filters.filter_template;
      browser.waitForElementPresent(tpl.puce(bclass), 10000, 'Attente d\'affichage'+filtre);
      browser.verify.cssProperty(tpl.puce(bclass), 'color', colors.filters.puces.cssString(browser), 'Couleur de la puce/ouverture'+filtre);
      browser.verify.cssProperty(tpl.background(bclass), 'background-color', sectionColors.background.cssString(browser), 'Couleur du fond de l\'en-tête'+filtre);
      browser.verify.cssProperty(tpl.title(bclass), 'color', sectionColors.text.cssString(browser), 'Couleur du texte de l\'en-tête'+filtre);
      //Ligne sélectionnable
      //On ouvre le filtre pour faire apparaître
      if(openFilter === true){
        var openElt = tpl.title(bclass);//tpl.collapse(bclass)
        browser.expect.element(openElt).to.be.present;
        browser.click(openElt, () => {console.log('Clic pour ouverture'+filtre+' ('+openElt+')');});
      }
      browser.waitForElementPresent(tpl.item(bclass), 10000, idt()+'Vérification d\'une ligne NON cochée'+filtre);
      logCtx.Inc();
      var indent = idt();//'   - ';
      browser.verify.cssProperty(tpl.itemCheckBox(bclass), 'color', colors.filters.item.unselected.checkbox.cssString(browser), indent+'Couleur d\'une case à cocher d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemTitle(bclass), 'color', colors.filters.item.unselected.text.cssString(browser), indent+'Couleur de l\'intitulé d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemCount(bclass), 'background-color', colors.filters.item.unselected.count.background.cssString(browser), indent+'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemCount(bclass), 'color', colors.filters.item.unselected.count.text.cssString(browser), indent+'Couleur du nombre de résultats d\'une ligne'+filtre);
      logCtx.Dec();
      
      //Ligne sélectionnée
      browser.click(tpl.itemCheckBox(bclass));
      browser.pause(1000);
      browser.waitForElementVisible(tpl.item(bclass), 1000, idt()+'Vérification d\'une ligne cochée'+filtre);
      logCtx.Inc();
      browser.verify.cssProperty(tpl.itemCheckBox(bclass), 'color', colors.filters.item.selected.checkbox.cssString(browser), indent+'Couleur d\'une case cochée d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemTitle(bclass), 'color', colors.filters.item.selected.text.cssString(browser), indent+'Couleur de l\'intitulé d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemCount(bclass), 'background-color', colors.filters.item.selected.count.background.cssString(browser), indent+'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
      browser.verify.cssProperty(tpl.itemCount(bclass), 'color', colors.filters.item.selected.count.text.cssString(browser), indent+'Couleur du nombre de résultats d\'une ligne'+filtre);
      browser.click(tpl.itemCheckBox(bclass)); 
      browser.waitForElementVisible(tpl.itemCheckBoxOff(bclass), 2000, 'Attente de désélection de la ligne');     
      browser.pause(10000);
      //On referme le filtre pour revenir à l'état initial
      if(openFilter === true){
        browser.click(tpl.collapse(bclass), () => {console.log('Clic pour fermeture'+filtre+' ('+tpl.collapse(bclass)+')');});
        browser.pause(1000);
      }
      logCtx.Dec();
    }
    if(checkSideBarVisibility === true){
      browser.waitForElementVisible(elts.filters.sidebar, 2000, 'Attente d\'apparition des filtres');
    }
    if(checkHeader === true){
      browser.verify.cssProperty(elts.filters.sidebar, 'background-color', colors.filters.header.background.cssString(browser), 'Couleur du fond de l\'en-tête des filtres');
      browser.verify.cssProperty(elts.filters.sidebar, 'color', colors.filters.header.text.cssString(browser), 'Couleur du texte de l\'en-tête des filtres');
    }
    checkFiltersSection(elts.filters.discipline, colors.filters.discipline);
    checkFiltersSection(elts.filters.dominante, colors.filters.dominante, true);
    checkFiltersSection(elts.filters.niveau, colors.filters.niveau, true);
  }
  var checkBtnCreate = function(){
    browser.verify.cssProperty(curTab.btnNouvSeance, 'background-color', colors.activeColor.cssString(browser), 'Couleur du fond du bouton "Créer une séance"');
    browser.verify.cssProperty(curTab.btnNouvSeance, 'color', colors.buttons.default.text.cssString(browser), 'Couleur du texte du bouton "Créer une séance"');
    browser.verify.containsText(curTab.btnNouvSeance, 'CRÉER UNE SÉANCE', 'Vérification du texte du bouton "Créer une séance"');
  }
  var checkRessSubTab = function(subTab, checkFiltersHeader){
    logCtx.Inc();
    browser.waitForElementPresent(subTab.selector, 1000, idt()+'Clic sur l\'onglet "'+subTab.label+'"');
    browser.click(subTab.selector);
    browser.waitForElementNotPresent(curTab.waitMsg, 20000, idt()+'Attente de disparition du message d\'attente de chargement');
    checkFiltersSideBar(true, checkFiltersHeader);
    checkBtnCreate();  
    logCtx.Dec();
  }

  
  logCtx.Inc();
  //Ex / Doc : 
  browser.waitForElementVisible(elts.filters.sidebar, 2000, logCtx.indentStr(curTab.label)+' (Attente d\'apparition des filtres)');
  browser.verify.cssProperty(curTab.tabsCont, 'background-color', misc.colorFromHex('#E8E8E8').cssString(browser), 'Couleur fond du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(curTab.tabSelected, 'color', misc.colorFromHex('#2C3E50').cssString(browser), 'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(curTab.tabUnselected, 'color', misc.colorFromHex('#2C3E50').cssString(browser), 'Couleur du texte désélectionné du bandeau "Exercices / Séances / Séances partagées"');
  checkRessSubTab(curTab.tabExosDocs, true);
  /*checkFiltersSideBar(false, true);
  checkBtnCreate();*/

  //Séances
  checkRessSubTab(curTab.tabSeances, false);
  /*browser.waitForElementPresent(curTab.tabSeances, 1000, 'Clic sur l\'onglet "Séances"');
  browser.click(curTab.tabSeances);
  browser.waitForElementNotPresent(curTab.waitMsg, 20000, 'Attente de disparition du message d\'attente de chargement');
  checkFiltersSideBar(true, false);
  checkBtnCreate();*/

  //Séances partagées
  checkRessSubTab(curTab.tabSeancesPart, false);
  /*browser.waitForElementPresent(curTab.tabSeancesPart, 1000, 'Clic sur l\'onglet "Séances partagées"');
  browser.click(curTab.tabSeancesPart);
  browser.waitForElementNotPresent(curTab.waitMsg, 20000, 'Attente de disparition du message d\'attente de chargement');
  checkFiltersSideBar(true, false);
  checkBtnCreate();*/
  logCtx.Dec();
}