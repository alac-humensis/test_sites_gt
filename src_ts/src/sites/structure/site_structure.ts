import { FilterSideBar } from "./filter";
import { BasicAccessor } from "./basic_accessor";
import { colorFromHex } from "../../helpers/color";
import { GtLMSSite } from "../GtLmsTemplate";
import { GtLMSLoginPage } from "./login_page";
import { GtLMSTabs, GtLMSUser } from "./main_page";

export class GtLMSStructure{
  site : GtLMSSite;
  filterSidebar: FilterSideBar;
  buttons: GtLMSCommonButtons;
  loginPage: GtLMSLoginPage;
  tabs: GtLMSTabs;
  user: GtLMSUser;

  constructor(site: GtLMSSite) {
    this.site = site;
    this.filterSidebar = new FilterSideBar(site.colors);
    this.buttons = new GtLMSCommonButtons();
    this.loginPage = new GtLMSLoginPage(site);
    this.tabs = new GtLMSTabs();
    this.user = new GtLMSUser(null, 'div.user-menu-content', '', 'Menu Utilisateur');
  }
}

class GtLMSCommonButtons{
  submit : BasicAccessor;
  btnCreerGpElv: BasicAccessor;
}
class GtLMSCommonElts{
  filterSidebar : FilterSideBar;
  buttons : GtLMSCommonButtons;
}

class GtLMSCommonData{
  colors;//TODO
  elts : GtLMSCommonElts;
}
