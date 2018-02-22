import { GtLMSSite } from "./GtLmsTemplate";
import { Filter } from "./structure/filter";
import { colorFromHex } from "../helpers/color";

export class Digitheque extends GtLMSSite {
  constructor() {
    super();
    this.accounts.prof.url = 'http://enseignant.digitheque-belin.fr';
    this.accounts.prof.login = 'alexandre.lac@editions-belin.fr';
    this.accounts.prof.password = 'Digitest';
  }
  ////  Fonctions à surcharger dans les classes filles  ////
  get siteName(){
    return 'Digithèque';
  }
  
  initColors(){
    this.colors.main.activeColor.initFromHex('#E60077');
    this.colors.main.inactiveColor.initFromHex('#6C797A');
    this.colors.main.lightText.initFromHex('#FFF');
    this.colors.main.placeholderText.initFromHex('#6F7780');

    this.colors.filters.activeColor.initFromHex('#0298ca');
    this.colors.filters.items.unselected.checkbox.initFromHex('#e8e8e8');
    this.colors.filters.items.unselected.text.initFromHex('#2c3e50');
    this.colors.filters.items.unselected.count.background.initFromHex('#757575');

    this.colors.buttons.secondary.background.initFromHex('F2F3F4');
  }

  initFilters(){
    this.struct.filterSidebar.filters.push(new Filter(this, 'discipline', 'DISCIPLINE', true, this.colors.filters.activeColor, colorFromHex('FFF')));
    this.struct.filterSidebar.filters.push(new Filter(this, 'dominante', 'DOMINANTE', false, colorFromHex('e8e8e8'), colorFromHex('6e6e6e')));
    this.struct.filterSidebar.filters.push(new Filter(this, 'niveau', 'NIVEAU', false, colorFromHex('34495e'), colorFromHex('FFF')));
  }

  initTabs(){
    //TODO
  }

  initAccounts(){
    //TODO
  }
  ////  FIN Fonctions à surcharger dans les classes filles  ////

}