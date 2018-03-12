import { BasicAccessor } from "./basic_accessor";
import { GtLMSSite } from "../GtLmsTemplate";
import { GtLMSTabRessources } from "./tab_ressources";

/** 
 * Classe uniquement pour distinguer des autres BasicAccessor à la compilation
*/
export class GtLMSTab extends BasicAccessor{
  //
}

export class GtLMSTabs{
  tabSelected : BasicAccessor = new BasicAccessor(null, '.menu-item.active a', '', 'Onglet sélectionné');
  tabUnselected : BasicAccessor = new BasicAccessor(null, '.menu-item:not(.active) a', '', 'Onglet désélectionné');

  home: GtLMSTab = new GtLMSTab(null, 'div.institution-infos img', '', 'Accueil');;
  ressources : GtLMSTabRessources;
  mesRessources: GtLMSTab = new GtLMSTab(null, 'a[ui-sref="app.library"]', 'Mes ressources');
  seances: GtLMSTab = new GtLMSTab(null, 'a[ui-sref="app.assignments"]', 'Séances envoyées');
  eleves: GtLMSTab = new GtLMSTab(null, 'a[ui-sref="app.groups"]', 'Mes élèves');
  tableauBord: GtLMSTab = new GtLMSTab(null, 'a[ui-sref="app.statistics-v2"]', 'Mes ressources');
  evalCognitives : GtLMSTab = new GtLMSTab(null, 'a[ui-sref="app.cognitiveAssesmentInfo"]', 'Mes ressources');
  forum: GtLMSTab = new GtLMSTab(null, 'a[gt-institution-translate="MODULE_FORUM_MENU"]', 'Mes ressources');
  msg: GtLMSTab = new GtLMSTab(null, 'a[ui-sref="app.messaging"]', 'Mes ressources');

  constructor(){
    this.ressources = new GtLMSTabRessources();
  }
}


export class GtLMSUser extends BasicAccessor{
  myProfile : BasicAccessor = new BasicAccessor(null, 'a[ui-sref="myprofile"]');
  logout : BasicAccessor = new BasicAccessor(null, 'a.logout');
}
