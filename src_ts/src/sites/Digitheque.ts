import { GtLMSSite } from "./GtLmsTemplate";
import { Filter } from "./structure/filter";
import { colorFromHex } from "../helpers/color";

export class Digitheque extends GtLMSSite {
  constructor() {
    super();
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

    this.colors.buttons.secondary.background.initFromHex('#F2F3F4');
  }

  initFilters(){
    this.struct.filterSidebar.filters.push(new Filter(this, 'discipline', 'DISCIPLINE', true, colorFromHex('#2c3e50'), colorFromHex('#FFF')));//actuellement #34495e
    this.struct.filterSidebar.filters.push(new Filter(this, 'dominante', 'DOMINANTE', false, colorFromHex('#e8e8e8'), colorFromHex('#6e6e6e')));
    this.struct.filterSidebar.filters.push(new Filter(this, 'niveau', 'NIVEAU', false, colorFromHex('#34495e'), colorFromHex('#FFF')));
  }

  initTabs(){
    //TODO
    this.struct.loginPage.pwdLost.url = 'http://enseignant.digitheque-belin.fr/#/password/lost';
    let ressHeader = this.struct.tabs.ressources.header;
    ressHeader.search.ico.colors.text = colorFromHex('#2C3E50');
    ressHeader.search.input.colors.background = colorFromHex('#fff');
    ressHeader.search.input.colors.text = colorFromHex('#1a2930');
    ressHeader.favorites_toggle.colors.text = colorFromHex('#fff');
    let ressTab = this.struct.tabs.ressources;
    ressTab.tabsCont.colors.background = colorFromHex('#E8E8E8');
    ressTab.tabSelected.colors.text = colorFromHex('#2C3E50');
    ressTab.tabUnselected.colors.text = colorFromHex('#2C3E50');
  }

  initAccounts(){
    this.accounts.prof.url = 'http://enseignant.digitheque-belin.fr';
    this.accounts.prof.login = 'alexandre.lac@editions-belin.fr';
    this.accounts.prof.password = 'Digitest';
  }
  ////  FIN Fonctions à surcharger dans les classes filles  ////

}