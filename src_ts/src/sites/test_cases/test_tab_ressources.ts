import { BasicNightwatchTest } from "./basic_test";
import { NightwatchBrowser } from "../../nightwatch";
import { GtLMSSite } from "../GtLmsTemplate";
import { TestFilters } from "./test_Filters";
import { RessSubTab } from "../structure/tab_ressources";
import { Filter } from "../structure/filter";
import { GtLMSFilterItemColors } from "../structure/site_colors";

export class TestTabRessources extends BasicNightwatchTest{
  
  filtersTest: TestFilters;

  constructor(site: GtLMSSite){
    super(site);
    this.filtersTest = new TestFilters(site);
  }

  protected _setTestId(){
    TestFilters.testId = 'Tab_Ress_check';
  }

  get name(): string{
    return 'Vérification de l\'onglet Ressources';
  }

  get canBeExecuted(): boolean{
    return this.site.struct.tabs.mesRessources.isActivated && this.site.struct.filterSidebar.isActivated;
  }

  execute(browser: NightwatchBrowser){
    //TODO
    let ressTab = this.struct.tabs.ressources;
    let logIndent = this.site.logIdt;
    this.site.selectTab(ressTab);
    logIndent.Inc();
    browser.waitForElementVisible(this.struct.filterSidebar.selector, 2000, logIndent.indentStr(ressTab.text)+' (Attente d\'apparition des filtres)');
    logIndent.Inc();
    var header = ressTab.header;
    browser.waitForElementVisible(header.selector, 2000, logIndent.indentStr('Vérification de la barre supérieure'));
    logIndent.Inc();
    this.site.checkElements([header, header.search.ico, header.search.input, header.favorites_toggle]);
    logIndent.Dec();
    this.site.checkElements([ressTab.tabsCont, ressTab.tabSelected, ressTab.tabUnselected]);
    
    ressTab.tabs.forEach((subTab: RessSubTab, index: number) => {
      this._checkRessSubTab(subTab, index == 0, index == 0);
    });

    logIndent.Dec();
    logIndent.Dec();
    /*
    TODO : Placer les tests ci-dessus dans filtersTest
    this.site.logIdt.Inc();
    this.filtersTest.execute(browser);
    this.site.logIdt.Dec();
    */
  }

  protected _checkRessSubTab(subTab: RessSubTab, checkFilters: boolean, checkFiltersHeader: boolean){
    if(subTab === undefined){
      return;
    }
    let ressTab = this.struct.tabs.ressources;
    let browser = this.browser;
    let logIndent = this.site.logIdt;
    browser.waitForElementPresent(subTab.selector, 1000, this.idt()+'Clic sur l\'onglet "'+subTab.text+'"');
    logIndent.Inc();
    browser.click(subTab.selector);
    browser.waitForElementNotPresent(ressTab.waitMsg.selector, 30000, this.idt()+'Attente de disparition du message d\'attente de chargement');
    if(checkFilters === true){
      this._checkFiltersSideBar(subTab, true, checkFiltersHeader);
    }
    this._checkBtnCreate();
    logIndent.Dec();
  }
  protected _checkBtnCreate(){
    let btnNouvSeance = this.struct.tabs.ressources.header.btnNouvSeance;
    this.site.checkElements([btnNouvSeance]);
  }

  protected _checkFiltersSideBar(subTab: RessSubTab, checkSideBarVisibility: boolean, checkHeader: boolean){
    let ressTab = this.struct.tabs.ressources;
    let browser = this.browser;
    let logIndent = this.site.logIdt;
    let filterSidebar = this.struct.filterSidebar;
    if(checkSideBarVisibility){
      browser.waitForElementVisible(filterSidebar.selector, 2000, this.idt()+'Attente d\'apparition des filtres');
    }
    if(checkHeader){
      this.site.checkElements([filterSidebar]);
    }
    this.struct.filterSidebar.filters.forEach((filter: Filter) => {
      this._checkFilterBlock(subTab, filter);
    });
  }

  protected _checkFilterBlock(subTab: RessSubTab, filter: Filter){
    let browser = this.browser;
    let site = this.site;
    let logIndent = this.site.logIdt;
    let openFilter = !filter.opened;
    let filtre = ' du filtre "'+filter.text+'"';
    
    browser.waitForElementPresent(filter.header.puce.selector, 10000, this.idt()+'Attente d\'affichage'+filtre);
    site.checkElements([filter.header, filter.header.puce, filter.header.title, filter.header.unselect]);
    //Ligne sélectionnable
    //On ouvre le filtre pour faire apparaître
    let openElt = filter.header.collapse;//tpl.collapse(bclass) //tpl.title(bclass)
    if(openFilter){
      //browser.expect.element(openElt).to.be.present;
      browser.click(openElt.selector, () => {console.log('Clic pour ouverture'+filtre+' ('+openElt.selector+')');});
      browser.pause(1000);
    }
    browser.waitForElementPresent(filter.item.selector, 10000, this.idt()+'Vérification d\'une ligne NON cochée'+filtre);
    let colors = site.colors;
    logIndent.Inc();
    this._checkFilterLineColors(filter, colors.filters.items.unselected);
    logIndent.Dec();
    
    //Ligne sélectionnée
    browser.click(filter.itemCheckBox.selector);
    browser.pause(1000);
    //browser.waitForElementVisible(tpl.item(bclass), 1000, idt()+'Vérification d\'une ligne cochée'+filtre);
    browser.waitForElementVisible(subTab.ligneRess.tag, 10000, this.idt()+'Vérification d\'une ligne cochée'+filtre);
    //TODO vérification de l'affichage d'un ressource
    logIndent.Inc();
    this._checkFilterLineColors(filter, colors.filters.items.selected);
    browser.click(filter.itemCheckBox.selector);
    //browser.waitForElementVisible(tpl.itemCheckBoxOff, 2000, 'Attente de désélection de la ligne');
    //browser.pause(10000);
    browser.pause(1000);
    browser.waitForElementVisible(subTab.ligneRess.tag, 10000, this.idt()+'Attente de désélection de la ligne');
    //On referme le filtre pour revenir à l'état initial
    if(openFilter){
      browser.click(openElt.selector, () => {console.log('Clic pour fermeture'+filtre+' ('+openElt.selector+')');});
      browser.pause(1000);
    }
    logIndent.Dec();
  }

  protected _checkFilterLineColors(filter: Filter, colors: GtLMSFilterItemColors){
    let filtre = ' du filtre "'+filter.text+'"';
    this.site.checkColor(filter.itemCheckBox, 'text', colors.checkbox, 'Couleur d\'une case à cocher d\'une ligne'+filtre);
    this.site.checkColor(filter.itemTitle, 'text', colors.text, 'Couleur de l\'intitulé d\'une ligne'+filtre);
    this.site.checkColor(filter.itemCount, 'bg', colors.count.background, 'Couleur du fond du nombre de résultats d\'une ligne'+filtre);
    this.site.checkColor(filter.itemCount, 'text', colors.count.text, 'Couleur du nombre de résultats d\'une ligne'+filtre);    
  }

}
