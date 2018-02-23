import { GtLMSSite } from "../GtLmsTemplate";
import { NightwatchBrowser } from "../../nightwatch";
import { zeroPad } from "../../helpers/misc";
import { BasicNightwatchTest } from "./basic_test";

export class NightwatchTestManager{
  protected _site: GtLMSSite;
  tests: Array<BasicNightwatchTest>;

  constructor(site: GtLMSSite){
    this._site = site;
    this.tests = [];
  }

  get site(): GtLMSSite{
    return this._site;
  }
  get browser(): NightwatchBrowser{
    return this.site.testContext.browser;
  }
  
  findById(testId: string): BasicNightwatchTest{
    for (let index = 0; index < this.tests.length; index++) {
      const element = this.tests[index];
      if(element.id == testId){
        return element;
      }
    }
    return null;
  }

  //genNodeExport(): {[testLabel: string] : (browser: NightwatchBrowser)=> {};} {
  genNodeExport(): any {
    let fctPrefix = function(inc?: boolean){
      if(inc !== false){
        fctNum++;
      }
      return zeroPad(fctNum, 2)+'-';
    }
    
    let site: GtLMSSite = this.site;
    let njsExp: any = {};
    let fctNum: number =  0;
    njsExp[fctPrefix()+'Initialisation des tests'] = function(browser: NightwatchBrowser){
      site.init(browser);
    };

    this.tests.forEach(test => {
      if(test.canBeExecuted){
        njsExp[fctPrefix()+test.name] = function(browser){
          test.execute(browser);
        };
      }
    });
    /*
    njsExp[fctPrefix()+'Vérification des couleurs'] = function(browser) {
        ////  ACCUEIL  ////
        site.checkColors();
      };
    */
    njsExp.after = function(browser: NightwatchBrowser) {
        if(browser.options.desiredCapabilities.browserName == 'MicrosoftEdge'){
          browser.click(site.struct.user.logout.selector);
          browser.deleteCookies(function() {
            console.log('Suppression des cookies pour Edge');
          });
        }
        console.log('Closing down...');
        browser.end();
      };
    return njsExp;
  }

  /*
  launchTests(){
    this.tests.forEach(test => {
      test.execute(this.browser);
      console.log("");
      this.browser.pause(500);
    });
  }
  */
}
