var misc = require('../src/helpers/misc.js');

/**
 * Ensemble de sélecteurs permettant de naviguer dans la digithèque
 */
var elts = {
  tabs: {
    home : 'div.institution-infos img',
    ressources: {
      selector : 'a[ui-sref="app.resources"]',
      btnNouvSeance : 'button.new-module',
      tabsCont : 'div.gt-tabs-menu',
      tabSelected : 'div.gt-tabs-menu__item--active',
      tabUnselected : 'div.gt-tabs-menu__item:not(.gt-tabs-menu__item--active)',
      tabExosDocs : 'div[ui-sref="app.resources"]',
      tabSeances : 'div[ui-sref="app.resources.modules"]',
      tabSeancesPart : 'div[ui-sref="app.resources.shared"]',
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
    discipline : {
      label : 'DISCIPLINE',
      background : 'div.gt-meta-filter-bloc.discipline div.gt-meta-filter-name',
      title : 'div.gt-meta-filter-bloc.discipline div.title',
      puce : 'div.gt-meta-filter-bloc.discipline .fa-chevron-circle-down',
      puce2 : 'div.gt-meta-filter-bloc.discipline div.gt-meta-filter-collapse i'
    },
    dominante : {
      label : 'DOMINANTE',
      background : 'div.gt-meta-filter-bloc.dominante div.gt-meta-filter-name',
      title : 'div.gt-meta-filter-bloc.dominante div.title',
      puce : 'div.gt-meta-filter-bloc.dominante div.gt-meta-filter-collapse i'
    },
    niveau : {
      label : 'NIVEAU',
      background : 'div.gt-meta-filter-bloc.niveau div.gt-meta-filter-name',
      title : 'div.gt-meta-filter-bloc.niveau div.title',
      puce : 'div.gt-meta-filter-bloc.niveau div.gt-meta-filter-collapse i'
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
      logOut(browser);
      logIn(browser, false);
      //logOut(browser);
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
    var checkFiltersSection = function(section, sectionColors){
      var filtre = ' du filtre "'+section.label+'"';
      browser.verify.cssProperty(section.puce, 'color', colors.filters.puces.cssString(browser), 'Couleur de la puce/ouverture'+filtre);
      browser.verify.cssProperty(section.background, 'background-color', sectionColors.background.cssString(browser), 'Couleur du fond de l\'en-tête'+filtre);
      browser.verify.cssProperty(section.title, 'color', sectionColors.text.cssString(browser), 'Couleur du texte de l\'en-tête'+filtre);
      //Ligne sélectionnable
      var indent = '   - ';
      browser.waitForElementPresent(section.background + 'gt-meta-filter-item', 1000, ' #Vérification d\'une ligne NON cochée'+filtre);
      browser.verify.cssProperty(section.background + ' i.fa-square', 'color', colors.filters.item.unselected.checkbox.cssString(browser), indent+'Couleur d\'une case à cocher d\'une ligne'+filtre);
      browser.verify.cssProperty(section.background + ' span.name', 'color', colors.filters.item.unselected.text.cssString(browser), indent+'Couleur de l\'intitulé d\'une ligne'+filtre);
      browser.verify.cssProperty(section.background + ' span.nb-value', 'background-color', colors.filters.item.unselected.count.background.cssString(browser), indent+'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
      browser.verify.cssProperty(section.background + ' span.nb-value', 'color', colors.filters.item.unselected.count.text.cssString(browser), indent+'Couleur du nombre de résultats d\'une ligne'+filtre);
      
      //Ligne sélectionnée
      browser.click(section.background + ' i.fa-square');
      browser.pause(1000);
      browser.waitForElementVisible(section.background + 'gt-meta-filter-item', 1000, ' #Vérification d\'une ligne cochée'+filtre);
      browser.verify.cssProperty(section.background + ' i.fa-square', 'color', colors.filters.item.selected.checkbox.cssString(browser), indent+'Couleur d\'une case cochée d\'une ligne'+filtre);
      browser.verify.cssProperty(section.background + ' span.name', 'color', colors.filters.item.selected.text.cssString(browser), indent+'Couleur de l\'intitulé d\'une ligne'+filtre);
      browser.verify.cssProperty(section.background + ' span.nb-value', 'background-color', colors.filters.item.selected.count.background.cssString(browser), indent+'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
      browser.verify.cssProperty(section.background + ' span.nb-value', 'color', colors.filters.item.selected.count.text.cssString(browser), indent+'Couleur du nombre de résultats d\'une ligne'+filtre);
      browser.click(section.background + ' i.fa-check-square');      
      browser.pause(1000);
    }
    if(checkSideBarVisibility === true){
      browser.waitForElementVisible(elts.filters.sidebar, 2000, 'Attente d\'apparition des filtres');
    }
    if(checkHeader === true){
      browser.verify.cssProperty(elts.filters.sidebar, 'background-color', colors.filters.header.background.cssString(browser), 'Couleur du fond de l\'en-tête des filtres');
      browser.verify.cssProperty(elts.filters.sidebar, 'color', colors.filters.header.text.cssString(browser), 'Couleur du texte de l\'en-tête des filtres');
    }
    checkFiltersSection(elts.filters.discipline, colors.filters.discipline);
    checkFiltersSection(elts.filters.dominante, colors.filters.dominante);
    checkFiltersSection(elts.filters.niveau, colors.filters.niveau);
  }
  var checkBtnCreate = function(){
    browser.verify.cssProperty(curTab.btnNouvSeance, 'background-color', colors.activeColor.cssString(browser), 'Couleur du fond du bouton "Créer une séance"');
    browser.verify.cssProperty(curTab.btnNouvSeance, 'color', colors.buttons.default.text.cssString(browser), 'Couleur du texte du bouton "Créer une séance"');
    browser.verify.containsText(curTab.btnNouvSeance, 'CRÉER UNE SÉANCE', 'Vérification du texte du bouton "Créer une séance"');
    }
  //Ex / Doc : 
  browser.waitForElementVisible(elts.filters.sidebar, 2000, 'Attente d\'apparition des filtres');
  browser.verify.cssProperty(curTab.tabsCont, 'background-color', misc.colorFromHex('#E8E8E8').cssString(browser), 'Couleur fond du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(curTab.tabSelected, 'color', misc.colorFromHex('#2C3E50').cssString(browser), 'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
  browser.verify.cssProperty(curTab.tabUnselected, 'color', misc.colorFromHex('#2C3E50').cssString(browser), 'Couleur du texte désélectionné du bandeau "Exercices / Séances / Séances partagées"');
  checkFiltersSideBar(false, true);
  checkBtnCreate();

  //Séances
  browser.waitForElementPresent(curTab.tabSeances, 1000, 'Clic sur l\'onglet "Séances"');
  browser.click(curTab.tabSeances);
  browser.waitForElementNotPresent(curTab.waitMsg, 20000, 'Attente de disparition du message d\'attente de chargement');
  checkFiltersSideBar(true, false);
  checkBtnCreate();

  //Séances partagées
  browser.waitForElementPresent(curTab.tabSeancesPart, 1000, 'Clic sur l\'onglet "Séances partagées"');
  browser.click(curTab.tabSeancesPart);
  browser.waitForElementNotPresent(curTab.waitMsg, 20000, 'Attente de disparition du message d\'attente de chargement');
  checkFiltersSideBar(true, false);
  checkBtnCreate();
}