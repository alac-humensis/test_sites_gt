var misc = require('../src/helpers/misc.js');

/**
 * Ensemble de sélecteurs permettant de naviguer dans la digithèque
 */
var elts = {
  tabs: {
    home : 'div.institution-infos img',
    tabRessources: 'a[ui-sref="app.resources"]',
    tabMesRessources: 'a[ui-sref="app.library"]',
    tabSeances: 'a[ui-sref="app.assignements"]',
    tabEleves: 'a[ui-sref="app.groups"]',
    tabStats: 'a[ui-sref="app.statistics-v2"]',
    tabForum: 'a[gt-institution-translate="MODULE_FORUM_MENU"]',
    tabMsg: 'a[ui-sref="app.messaging"]',
  },
  user: {
    myProfile : 'a[ui-sref="myprofile"]',
    logout : 'a.logout'
  },
  buttons : {
    sideBarFilters : 'div.list-header-sidebar-button',
    ressources : {
      btnNouvSeance : 'button.new-module'
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
    header : {
      background : misc.colorFromHex('#0298CA'),
      text : misc.colorFromHex('#FFF')
    },
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
  browser.click(cssDest);
}


module.exports = {
    
    'Digitheque Login' : function (browser) {
      browser
        .url('http://enseignant.digitheque-belin.fr')
        .waitForElementVisible('body', 5000)
        .waitForElementVisible('#gt-placeholder-0', 5000);

      //Je n'arrive pas à trouver la couleur du texte dans le place-holder
      //browser.verify.cssProperty('#gt-placeholder-7', 'background-color', 'rgb('+selColor.r+', '+selColor.g+', '+selColor.b+')', 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
      browser.verify.cssProperty('button.auth-register', 'background-color', colors.buttons.secondary.background.cssString(browser), 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
      browser.verify.cssProperty('button.auth-register', 'color', colors.buttons.secondary.text.cssString(browser), 'Vérification de la couleur du texte du bouton "S\'enregistrer"');
      browser.verify.cssProperty('button.btn-login', 'background-color', colors.buttons.default.background.cssString(browser), 'Vérification de la couleur du fond du bouton "Se connecter"');
      browser.verify.cssProperty('button.btn-login', 'color', colors.buttons.default.text.cssString(browser), 'Vérification de la couleur du texte du bouton "Se connecter"');
      

      browser.setValue('#gt-placeholder-0', 'alexandre.lac@editions-belin.fr')
        .setValue('#gt-placeholder-1', ['Digitest', browser.Keys.ENTER]);
        //.click('button[type=submit]')
        //.assert.containsText('#main', 'Night Watch')
        //.expect.element('#main').text.to.not.contain('The Night Watch');
        
        browser.waitForElementVisible(elts.tabs.home, 10000);
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
      goTo(browser, elts.tabs.tabRessources);
      //browser.waitForElementVisible('button[ui-sref="app.groups.create"]', 2000);
      
      browser.waitForElementVisible(elts.buttons.sideBarFilters, 2000);
      browser.verify.cssProperty(elts.buttons.sideBarFilters, 'background-color', colors.filters.header.background.cssString(browser), 'Couleur du fond de l\'en-tête des filtres');
      browser.verify.cssProperty(elts.buttons.sideBarFilters, 'color', colors.filters.header.text.cssString(browser), 'Couleur du texte de l\'en-tête des filtres');
      browser.verify.cssProperty(elts.buttons.ressources.btnNouvSeance, 'background-color', colors.activeColor.cssString(browser), 'Couleur du fond du bouton "Créer une séance"');
      browser.verify.cssProperty(elts.buttons.ressources.btnNouvSeance, 'color', colors.buttons.default.text.cssString(browser), 'Couleur du texte du bouton "Créer une séance"');
      browser.verify.cssProperty('div.gt-tabs-menu', 'background-color', misc.colorFromHex('#E8E8E8').cssString(browser), 'Couleur fond du bandeau "Exercices / Séances / Séances partagées"');
      browser.verify.cssProperty('div.gt-tabs-menu__item--active', 'color', misc.colorFromHex('#2C3E50').cssString(browser), 'Couleur du texte sélectionné du bandeau "Exercices / Séances / Séances partagées"');
      browser.verify.cssProperty('div.gt-tabs-menu__item:not(.gt-tabs-menu__item--active)', 'color', misc.colorFromHex('#2C3E50').cssString(browser), 'Couleur du texte désélectionné du bandeau "Exercices / Séances / Séances partagées"');
    },

    'Création de groupe' : function(browser) {
      home(browser);
      //browser.click('a[ui-sref="app.resources"]');
      //browser.click('a[ui-sref="app.groups"]');
      browser.click(elts.tabs.tabEleves);
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