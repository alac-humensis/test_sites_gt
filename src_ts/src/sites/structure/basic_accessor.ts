import { Color, colorFromHex } from "../../helpers/color";
import { BasicCssColors } from "./site_colors";
import { NightwatchBrowser } from "../../nightwatch";
import { TestContext } from "../GtLmsTemplate";

export class BasicAccessor{
  selector: string;
  colors: BasicCssColors;
  text: string;
  url: string;
  logLabel: string;
  activated: boolean;

  constructor(protected parent: BasicAccessor, cssSelector: string, displayedText: string='', logLabel: string='',
                        backgroundColor: Color=null, textColor: Color=null, borderColor: Color=null) {
    this.selector = cssSelector;
    this.colors = new BasicCssColors(backgroundColor, textColor, borderColor);
    this.text = displayedText;
    this.logLabel = logLabel;//Pour le log dans Nightwatch
    this.activated = true;//Propriété pour indiquer si l'élément est activé/visible ou non sur le site
    this.url = '';
  }
  
  get isActivated() { 
    if(this.parent == null)
      return this.activated;
    else return (!this.activated ? false : this.parent.isActivated );
  }

  protected _checkActivation(msg: string=''): boolean{
    if(!this.isActivated){
      if(this.logLabel.length>0)
        console.log('Test ignoré : Vérification de "'+this.logLabel+'"');
      return false;
    }
    else{
      return true;
    }
  }

  protected _getLogMsg(msgRoot: string): string{
    let label = (this.logLabel.length>0) ? this.logLabel : this.text;
    let msg = (label.length>0) ? msgRoot+' "'+label+'"' : undefined;
    return msg;
  }
  protected _getLogMsgIndented(ctx: TestContext, msgRoot: string): string{
    let msg = this._getLogMsg(msgRoot);
    return (msg != undefined) ? ctx.logIndent.indentStr()+msg : undefined;
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
