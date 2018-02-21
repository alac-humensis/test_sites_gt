import { BasicAccessor } from "./basic_accessor";
import { GtLMSSite } from "../GtLmsTemplate";

//"use strict";

//import BasicAccessor from './basic_accessor.mjs';

export class FilterSideBar extends BasicAccessor{
  sidebar_toggle: BasicAccessor;
  filters: Array<Filter> = [];

  constructor() {
    //TODO set du parent
    super(null, 'div.list-header-sidebar-button', '', 'en-tête des filtres');
    this.sidebar_toggle = new BasicAccessor(this, 'div.toggle-sidebar-button');
    /*
    this.filters = {
      discipline : new Filter(self, 'discipline', 'DISCIPLINE', true),
      dominante : new Filter(self, 'dominante', 'DOMINANTE', false),
      niveau : new Filter(self, 'niveau', 'NIVEAU', false)
    }
    */
  }
}

export class Filter extends BasicAccessor{
  blockClass: String;
  opened: Boolean;
  
  constructor(parentSideBar: FilterSideBar, blockClass: string, label: string, opened: boolean) {
    super(parentSideBar, 'div.gt-meta-filter-bloc.'+blockClass, label);
    this.blockClass = blockClass;
    this.opened = opened;
  }
  
  get bloc() { return this.selector}
  get background() { return this.bloc+' div.gt-meta-filter-name'}
  get title() { return this.bloc+' div.title'}
  get unselect() { return this.bloc+' .gt-meta-filter-cancel span'}
  get collapse() { return this.bloc+' .gt-meta-filter-collapse'}
  get puce() { return this.collapse+' i'}
    //puce_old: function(blockClass) { return this.bloc(blockClass)+' .fa-chevron-circle-down, '+this.bloc(blockClass)+' .fa-chevron-circle-right'},
  get values() { return this.bloc+' div.gt-meta-filter-values'}
  get item() { return this.values+' div.gt-meta-filter-item'}
  get itemCheckBoxOn() { return this.item+' i.fa-check-square' }
  get itemCheckBoxOff() { return this.item+'  i.fa-square' }
  get itemCheckBox() { return this.itemCheckBoxOff+', '+this.itemCheckBoxOn }
  get itemTitle() { return this.item+' span.name'}
  get itemCount() { return this.item+' span.nb-value'}
}
