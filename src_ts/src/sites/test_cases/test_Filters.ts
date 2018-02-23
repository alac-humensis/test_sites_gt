import { BasicNightwatchTest } from "./basic_test";
import { NightwatchBrowser } from "../../nightwatch";
import { GtLMSSite } from "../GtLmsTemplate";

//"use strict";

//import BasicAccessor from './basic_accessor.mjs';

export class TestFilters extends BasicNightwatchTest{
  
  //static testId: string = 'Filters_check';
  protected _setTestId(){
    TestFilters.testId = 'Filters_check';
  }

  get name(): string{
    return 'Vérification des filtres';
  }

  get canBeExecuted(): boolean{
    return this.site.struct.tabs.mesRessources.isActivated && this.site.struct.filterSidebar.isActivated;
  }

  execute(browser: NightwatchBrowser){
    //TODO
    this.site.logIdt.Inc();
    browser.waitForElementVisible(this.struct.filterSidebar.selector, 2000,this.idt(this.struct.tabs.ressources.text)+' (Attente d\'apparition des filtres)');
    this.site.logIdt.Dec();
  }

}
