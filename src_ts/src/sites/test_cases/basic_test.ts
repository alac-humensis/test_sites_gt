import { GtLMSSite } from "../GtLmsTemplate";
import { NightwatchBrowser } from "../../nightwatch";

export abstract class BasicTest{
  protected _site: GtLMSSite;

  constructor(site: GtLMSSite) {
    this._site = site;
  }

  ////  Méthodes et Accesseurs à surcharger dans les classes filles  ////
  abstract execute();
  ////  FIN Méthodes et Accesseurs à surcharger dans les classes filles  ////

  get site(): GtLMSSite{
    return this._site;
  }
  get browser(): NightwatchBrowser{
    return this._site.testContext.browser;
  }
  idt(): string{
    return this._site.testContext.logIndent.indentStr();
  }

  checkProperties(ctx: TestContext){
    if(!this._checkActivation()) return;
    this.checkColors(ctx);
    this.checkText(ctx);
    this.checkUrl(ctx);
  }
  checkColors(ctx: TestContext){
    if(!this._checkActivation()) return;
    if(this.colors.background != null){
      this.checkColor(ctx, 'bg', this.colors.background);
    }
    if(this.colors.text != null){
      this.checkColor(ctx, 'text', this.colors.text);
    }
    if(this.colors.border != null){
      this.checkColor(ctx, 'border', this.colors.border);
    }
  }

  checkColor(ctx: TestContext, cssProp: string, color: Color){
    if(!this._checkActivation()) return;
    
    let testProp = cssProp;
    let msg: string = undefined;
    switch(cssProp){
      case 'bg' :
      case 'background' :
      case 'background-color' : 
          testProp = 'background-color';
          msg = this._getLogMsg('Couleur du fond de');
        break;
      case 'txt' :
      case 'text' : 
          testProp = 'color';
          msg = this._getLogMsg('Couleur du texte de');
        break;
      case 'border' : 
          testProp = 'border-color';
          msg = this._getLogMsg('Couleur de la bordure de');
        break;
    }
    if(color == null){
      console.error('Test ignoré car couleur nulle : '+msg);
    }
    else{
      ctx.browser.verify.cssProperty(this.selector, testProp, color.cssString(ctx.browser), (msg !== undefined ? ctx.logIndent.indentStr()+msg : msg));
    }
  }

  checkText(ctx: TestContext){
    if(!this._checkActivation()) return;
    if(this.text.length == 0) return;
    ctx.browser.verify.containsText(this.selector, this.text, this._getLogMsgIndented(ctx, 'Vérification du texte du bouton '));
  }

  checkUrl(ctx: TestContext){
    if(!this._checkActivation()) return;
    if(this.url.length == 0) return;
    ctx.browser.verify.attributeEquals(this.selector, 'href', this.url, this._getLogMsgIndented(ctx, 'Vérification du lien '));
  }
}
