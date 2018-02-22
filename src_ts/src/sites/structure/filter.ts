import { BasicAccessor } from "./basic_accessor";
import { GtLMSSite } from "../GtLmsTemplate";
import { GtLMSColors } from "./site_colors";
import { colorFromHex, Color } from "../../helpers/color";

//"use strict";

//import BasicAccessor from './basic_accessor.mjs';

export class FilterSideBar extends BasicAccessor{
  lmsColors: GtLMSColors;
  sidebar_toggle: BasicAccessor;
  filters: Array<Filter> = [];

  constructor(lmsColors: GtLMSColors) {
    //TODO set du parent
    super(null, 'div.list-header-sidebar-button', '', 'en-tête des filtres');
    this.lmsColors = lmsColors;
    this.sidebar_toggle = new BasicAccessor(this, 'div.toggle-sidebar-button');
  }
}

/** 
 * @description Filtre à tester représentatif du site
 * @default
 * cf site.colors.filters
 * puce.colors.texte = site.colors.filters.puces;
*/
export class Filter extends BasicAccessor{
  blockClass: String;
  opened: Boolean;
  header : FilterHeader;
  values : BasicAccessor;
  item : BasicAccessor;
  itemCheckBoxOn : BasicAccessor;
  itemCheckBoxOff : BasicAccessor;
  itemCheckBox : BasicAccessor;
  itemTitle : BasicAccessor;
  itemCount : BasicAccessor;
  
  constructor(site: GtLMSSite, blockClass: string, title: string, opened: boolean, headerBackground: Color, titleColor: Color) {
    super(site.struct.filterSidebar, 'div.gt-meta-filter-bloc.'+blockClass, title);
    this.blockClass = blockClass;
    this.opened = opened;
    this.header = new FilterHeader(this, title, headerBackground, titleColor);
    this.values = new BasicAccessor(this, this.blockClass+' div.gt-meta-filter-values');
    this.item = new BasicAccessor(this, this.blockClass+' div.gt-meta-filter-item');
    this.itemCheckBoxOn = new BasicAccessor(this, this.blockClass+' i.fa-check-square');
    this.itemCheckBoxOff = new BasicAccessor(this, this.blockClass+'  i.fa-square');
    this.itemCheckBox = new BasicAccessor(this, this.itemCheckBoxOff.selector +', '+this.itemCheckBoxOn.selector);
    this.itemTitle = new BasicAccessor(this, this.blockClass+' span.name');
    this.itemCount = new BasicAccessor(this, this.blockClass+' span.nb-value');
  }
  get parentSideBar(): FilterSideBar{
    return <FilterSideBar>this.parent;
  }
}

class FilterHeader extends BasicAccessor{
  title : BasicAccessor;
  unselect : BasicAccessor;
  collapse : BasicAccessor;
  puce : BasicAccessor;
  constructor(parent: Filter, title: string, headerBackground: Color, titleColor: Color) {
    super(parent, parent.selector+' div.gt-meta-filter-name', '', 'en-tête du filtre '+title, headerBackground);
    this.title = new BasicAccessor(this, parent.selector+' div.title', title, '', this.colors.background, titleColor);
    this.unselect = new BasicAccessor(this, parent.selector+' .gt-meta-filter-cancel span', 'Déselectionner', '', null, titleColor);
    this.collapse = new BasicAccessor(this, parent.selector+' .gt-meta-filter-collapse');
    this.puce = new BasicAccessor(this, parent.selector+' i', '', 'la puce/ouverture', null, parent.parentSideBar.lmsColors.filters.puces);
  }
}
class FilterItem extends BasicAccessor{

}