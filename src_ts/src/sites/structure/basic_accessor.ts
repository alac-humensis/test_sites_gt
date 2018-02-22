import { Color, colorFromHex } from "../../helpers/color";
import { BasicCssColors } from "./site_colors";

export class BasicAccessor{
  selector: string;
  colors: BasicCssColors;
  text: string;
  logLabel: string;
  activated: boolean;

  constructor(protected parent: BasicAccessor, cssSelector: string, displayedText: string='', logLabel: string='',
                        backgroundColor: Color=null, textColor: Color=null, borderColor: Color=null) {
    this.selector = cssSelector;
    this.colors = new BasicCssColors(backgroundColor, textColor, borderColor);
    this.text = displayedText;
    this.logLabel = logLabel;//Pour le log dans Nightwatch
    this.activated = true;//Propriété pour indiquer si l'élément est activé/visible ou non sur le site
  }
  
  get isActivated() { 
    if(this.parent == null)
      return this.activated;
    else return (!this.activated ? false : this.parent.isActivated() );
  }
}
