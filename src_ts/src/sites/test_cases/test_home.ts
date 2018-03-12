import { BasicNightwatchTest } from "./basic_test";
import { NightwatchBrowser } from "../../nightwatch";

export class TestHome extends BasicNightwatchTest{
  
  protected _setTestId(){
    TestHome.testId = 'Main_page_check';
  }

  get name(): string{
    return 'Accueil';
  }

  get canBeExecuted(): boolean{
    return true;
    /*let prof = this.site.struct.user;
    return prof.login != '' && prof.password != '' && prof.url != '';*/
  }

  execute(browser: NightwatchBrowser){
    this.site.checkElements([this.struct.user.myProfile, this.struct.user.logout]);
    this.site.checkElements([this.struct.tabs.tabSelected, this.struct.tabs.tabUnselected]);
  }
}
