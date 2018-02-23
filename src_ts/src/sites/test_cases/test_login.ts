import { BasicNightwatchTest } from "./basic_test";
import { NightwatchBrowser } from "../../nightwatch";
import { GtLMSSite, GtLMSAccount } from "../GtLmsTemplate";

export class TestLogin extends BasicNightwatchTest{
  
  protected _setTestId(){
    TestLogin.testId = 'Login_check';
  }

  get name(): string{
    return 'Authentification';
  }

  get canBeExecuted(): boolean{
    let prof = this.site.accounts.prof;
    return prof.login != '' && prof.password != '' && prof.url != '';
  }

  get testAccount(): GtLMSAccount{
    return this.site.accounts.prof;
  }

  execute(browser: NightwatchBrowser){
    browser
      .url(this.testAccount.url)
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#gt-placeholder-0', 15000);
    
    //Je n'arrive pas à trouver la couleur du texte dans le place-holder
    //browser.verify.cssProperty('#gt-placeholder-7', 'background-color', 'rgb('+selColor.r+', '+selColor.g+', '+selColor.b+')', 'Vérification de la couleur du fond du bouton "S\'enregistrer"');
    let loginPage = this.site.struct.loginPage;
    this.site.checkElements([loginPage.login, loginPage.register, loginPage.pwdLost]);
    this._logIn(this.testAccount, true);
    this._logOut();
    this._logIn(this.testAccount, false);
  }
  
  protected _logIn(account: GtLMSAccount, useEnterKey: boolean){
    let browser = this.browser;
    browser.waitForElementVisible('input[ng-model="LoginCtrl.email"]', 5000, 'Attente d\'affichage de la page de connexion (Test avec '+(useEnterKey ? 'la touche Entrée)' : ' le bouton "'+this.site.struct.loginPage.login.text+'"')+')');
    browser.setValue('#gt-placeholder-0', account.login);
    if(useEnterKey){
      browser.setValue('#gt-placeholder-1', [account.password, browser.Keys.ENTER]);
    }
    else{
      browser.setValue('#gt-placeholder-1', account.password);
      browser.click(this.site.struct.loginPage.login.selector);
    }
    browser.waitForElementVisible(this.site.struct.tabs.home.selector, 10000, 'Attente d\'affichage de l\'accueil (%s) : %d ms');
  }

  protected _logOut(){
    let browser = this.browser;
    browser.execute("document.querySelector('div.user-menu-content').style.setProperty('display', 'block', 'important');");
    browser.waitForElementVisible(this.site.struct.user.logout.selector, 1000, 'Déconnexion');
    browser.click(this.site.struct.user.logout.selector);
  }
}
