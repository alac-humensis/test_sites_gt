var misc = require('../helpers/misc.js');
var logIndent = require('../helpers/LogIndent.js');

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

class SiteTemplate{
  constructor(id, url) {
    this.id = id;
    this.url = url;
    this.elts = {};
    this.colors = {};
    this.accounts = {};
    this.browser = null;
  }

  _init_(browser) {
    this.browser = browser;
    browser
      //.url('http://enseignant.digitheque-belin.fr')
      .url('https://www.google.fr')
      .waitForElementVisible('body', 5000, true, undefined, 'Navigateur '+browser.options.desiredCapabilities.browserName);
    //browser.end();
  }  
  
  login() {
    let browser = this.browser;
    browser
      .url(this.url)
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#gt-placeholder-0', 5000);
    
    //Je n'arrive pas à trouver la couleur du texte dans le place-holder
    //browser.verify.cssProperty('#gt-placeholder-7', 'background-color', 'rgb('+selColor.r+', '+selColor.g+', '+selColor.b+')', 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.register, 'background-color', this.colors.buttons.secondary.background.cssString(browser), 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.register, 'color', this.colors.buttons.secondary.text.cssString(browser), 'Vérification de la couleur du texte du bouton "S\'enregistrer"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.login, 'background-color', this.colors.buttons.default.background.cssString(browser), 'Vérification de la couleur du fond du bouton "Se connecter"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.login, 'color', this.colors.buttons.default.text.cssString(browser), 'Vérification de la couleur du texte du bouton "Se connecter"');
    browser.verify.cssProperty(this.elts.buttons.loginPage.pwdLost, 'color', this.colors.activeColor.cssString(browser), 'Vérification de la couleur du texte "Mot de passe oublié ?"');
    
    logIn(this, true);
  }

  _subFct(){
    return 'Template';
  }
  siteName(){
    return this._subFct();
  }

}

export default SiteTemplate;