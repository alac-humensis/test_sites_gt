import { GtLMSSite } from "../GtLmsTemplate";
import { NightwatchBrowser } from "../../nightwatch";
import { GtLMSStructure } from "../structure/site_structure";

export abstract class BasicNightwatchTest{
  static testId: string = 'NO_ID';

  protected _site: GtLMSSite;
  
  constructor(site: GtLMSSite) {
    this._site = site;
    this._setTestId();
  }

  ////  Méthodes et Accesseurs à surcharger dans les classes filles  ////
  /** 
   * Méthode dans laquelle le membre statique BasicNightwatchTest.testId doit être renseigné
  */
  protected abstract _setTestId();
  abstract get name(): string;
  abstract execute(browser: NightwatchBrowser);
  abstract get canBeExecuted(): boolean;
  ////  FIN Méthodes et Accesseurs à surcharger dans les classes filles  ////

  get id(): string{
    var instClass = <typeof BasicNightwatchTest>this.constructor; 
    console.log('instClass.testId : '+instClass.testId);
    return instClass.testId;
  }
  get site(): GtLMSSite{
    return this._site;
  }
  get browser(): NightwatchBrowser{
    return this.site.testContext.browser;
  }
  get struct(): GtLMSStructure{
    return this.site.struct;
  }
  
  idt(logIndentTitle?: string): string{
    return this.site.testContext.logIndent.indentStr(logIndentTitle);
  }
}
