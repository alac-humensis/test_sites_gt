import { colorFromHex } from "../../helpers/color";
import { Color } from "../../helpers/color";
import { GtLMSTemplate } from "../GtLmsTemplate";

"use strict";


var misc = require('../../helpers/misc.js');


export class BasicCssColors {
  constructor(public background: Color=null, public text: Color=null, public border: Color=null) {
    //
  }
}
class FilterHeaderColors extends BasicCssColors{
  unselect: Color = colorFromHex('#6e6e6e');
}

class GtLMSMainColors{
  activeColor : Color = colorFromHex('#E60077');
  inactiveColor: Color = colorFromHex('#6C797A');
  lightText: Color = colorFromHex('#FFF');
  placeholderText : Color = colorFromHex('#6F7780');
}

class GtLMSSpecificItemColor{
  constructor(public lmsColors: GtLMSColors){
    //
  }  
}
class GtLMSFiltersColors extends GtLMSSpecificItemColor{
  activeColor : Color = colorFromHex('#0298ca');
  puces : Color;
  items: GtLMSFilterItemsColors;

  constructor(lmsColors: GtLMSColors){
    super(lmsColors);
    this.puces = this.lmsColors.main.activeColor;
    this.items = new GtLMSFilterItemsColors(lmsColors);
  }
}
class GtLMSFilterItemsColors extends GtLMSSpecificItemColor{
  /**
   * @description Valeurs par défaut :
   * checkbox / text  = main.filters.activeColor  |  
   * count.background = main.filters.activeColor  |  
   * count.text = main.lightText
   */
  selected : GtLMSFilterItemColors;
  /**
   * @description Valeurs par défaut : count.text = main.lightText
   */
  unselected : GtLMSFilterItemColors;

  constructor(lmsColors: GtLMSColors){
    super(lmsColors);
    //Ligne(=filtre) non sélectionnée
    this.unselected = new GtLMSFilterItemColors(lmsColors);
    //Ligne(=filtre) sélectionnée
    this.selected = new GtLMSFilterItemColors(lmsColors);
    this.selected.checkbox = this.lmsColors.filters.activeColor;
    this.selected.text = this.lmsColors.filters.activeColor;
    this.selected.count.background = this.lmsColors.filters.activeColor;
    this.selected.count.text = this.lmsColors.main.lightText;
  }
}
/** 
 * Couleurs d'un filtre, en utilisant la version non sélectionnée par défaut
*/
class GtLMSFilterItemColors extends GtLMSSpecificItemColor{
  checkbox : Color = colorFromHex('#e8e8e8');
  text : Color = colorFromHex('#2c3e50');
  /**
   * @count text = main.lightText
   */
  count : BasicCssColors;
  
  constructor(lmsColors: GtLMSColors){
    super(lmsColors);
    this.count = new BasicCssColors(colorFromHex('#757575'), this.lmsColors.main.lightText);
  }
}

class GtLMSButtonsColors extends GtLMSSpecificItemColor{
  /**
   * @description Valeurs par défaut :
   * background = main.activeColor  |  
   * text = main.lightText
   */
  default : BasicCssColors;
  /**
   * @description Valeurs par défaut :
   * background = #F2F3F4  |  
   * text = main.activeColor
   */
  secondary : BasicCssColors;

  constructor(lmsColors: GtLMSColors){
    super(lmsColors);
    this.default = new BasicCssColors(lmsColors.main.activeColor, lmsColors.main.lightText);
    this.secondary = new BasicCssColors(colorFromHex('#F2F3F4'), lmsColors.main.activeColor);
  }
}

/** 
 * Couleurs de configuration du LMS, basées sur la Digithèque par défaut
*/
export class GtLMSColors{
  main : GtLMSMainColors = new GtLMSMainColors();
  filters : GtLMSFiltersColors = new GtLMSFiltersColors(this);
  buttons : GtLMSButtonsColors = new GtLMSButtonsColors(this);

  constructor(public site: GtLMSTemplate) {
    this.filters.items.unselected.count;
  }
}
