import { colorFromHex } from "../../helpers/color";
import { Color } from "../../helpers/color";
import { GtLMSSite } from "../GtLmsTemplate";

"use strict";


var misc = require('../../helpers/misc.js');


export class BasicCssColors {
  constructor(public background: Color=null, public text: Color=null, public border: Color=null) {
    //
  }
}
//TODO : A quoi correspond cette couleur ?
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
  constructor(protected lmsColors: GtLMSColors){
    //
  }  
}

class GtLMSFiltersColors extends GtLMSSpecificItemColor{
  activeColor : Color = colorFromHex('#0298ca');
  /**
   * @default
   * main.activeColor
   */
  puces : Color;
  items: GtLMSFilterItemsColors;

  constructor(lmsColors: GtLMSColors){
    super(lmsColors);
    this.puces = this.lmsColors.main.activeColor;
    this.items = new GtLMSFilterItemsColors(lmsColors);
  }
}
/** 
 * Couleurs des filtres sélectionnés ou non
 * @name GtLMSFilterItemsColors
*/
class GtLMSFilterItemsColors extends GtLMSSpecificItemColor{
  /**
   * @description Filtre sélectionné
   * TODO : FF
   * @default 
   * checkbox / text  = filters.activeColor
   * count.background = filters.activeColor
   * count.text = main.lightText
   * @example 
   * //TODO : nothing if defaults are good for you
   * let cls = site.colors;
   * cls.filters.items.selected.checkbox = cls.main.activeColor
   */
  selected : GtLMSFilterItemColors;
  /**
   * @description Filtre non sélectionné (par défaut)
   * @default 
   * count.text = main.lightText
   * @example 
   * //TODO : set checkbox  /  text  /  count.background
   * let cls = site.colors.filters.items.unselected;
   * cls.checkbox.initFromHex('#aa99ee');
   * cls.text.initFromHex('#aa99ee');
   * cls.count.background = site.colors.main.activeColor;
   */
  unselected : GtLMSFilterItemColors;

  constructor(lmsColors: GtLMSColors){
    super(lmsColors);
    //Ligne(=filtre) non sélectionnée
    this.unselected = new GtLMSFilterItemColors(lmsColors);
    //Ligne(=filtre) sélectionnée
    this.selected = new GtLMSFilterItemColors(lmsColors);
    this.selected.checkbox = lmsColors.filters.activeColor;
    this.selected.text = lmsColors.filters.activeColor;
    this.selected.count.background = lmsColors.filters.activeColor;
    this.selected.count.text = lmsColors.main.lightText;
  }
}
/** 
 * Couleurs d'un filtre, en utilisant la version non sélectionnée par défaut
*/
class GtLMSFilterItemColors extends GtLMSSpecificItemColor{
  checkbox : Color = colorFromHex('#e8e8e8');
  text : Color = colorFromHex('#2c3e50');
  /**
   * @description Bulle à droite indiquant le nombre de résultats correspondant au filtre
   * @default
   * count.text = main.lightText
   */
  count : BasicCssColors;
  
  constructor(lmsColors: GtLMSColors){
    super(lmsColors);
    this.count = new BasicCssColors(colorFromHex('#757575'), lmsColors.main.lightText);
  }
}

class GtLMSButtonsColors extends GtLMSSpecificItemColor{
  /**
   * @description Bouton d'action "par défaut" (ou tout du moins mise en avant)
   * @default
   * background = main.activeColor
   * text = main.lightText
   */
  default : BasicCssColors;
  /**
   * @description Bouton d'action secondaire ou d'annulation
   * @default
   * text = main.activeColor
   * @example
   * // TODO : set background
   * site.colors.buttons.secondary.background.initFromHex('#F2F3F4')
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
  /**
   * @description Couleurs principales utilisées par de nombreux éléments du site
   * (ex : buttons.default.background = main.activeColor)
   * @example
   * // TODO : set these values to configure many site elements 
   * let cls = site.colors;
   * cls.buttons.default.background = cls.main.activeColor;//= default button by default value
   * cls.main.activeColor.initFromHex('#00aa55');//Will affect default button background
   */
  main : GtLMSMainColors = new GtLMSMainColors();
  /**
   * @description Common filters colors
   * @example
   * // TODO : set these values to configure common filter elements
   * let cls = site.colors.filters;
   * cls.activeColor.initFromHex('#0298ca');
   * cls.items.selected.count.background = cls.activeColor;
   * cls.items.unselected.checkbox.initFromHex('#e8e8e8');
   * cls.items.unselected.text.initFromHex('#2c3e50');
   * cls.items.unselected.count.background.initFromHex('#757575');
   */
  filters : GtLMSFiltersColors = new GtLMSFiltersColors(this);
  buttons : GtLMSButtonsColors = new GtLMSButtonsColors(this);

  constructor(protected site: GtLMSSite) {
    this.filters.items.unselected.count;
  }
}
