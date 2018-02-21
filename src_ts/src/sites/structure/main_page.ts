import { BasicAccessor } from "./basic_accessor";
import { GtLMSSite } from "../GtLmsTemplate";
import { GtLMSTabRessources } from "./tab_ressources";

export class GtLMSTabs{
  home: BasicAccessor = new BasicAccessor(null, 'div.institution-infos img', '', 'Accueil');;
  ressources : GtLMSTabRessources;
  mesRessources: BasicAccessor = new BasicAccessor(null, 'a[ui-sref="app.library"]', 'Mes ressources');
  seances: BasicAccessor = new BasicAccessor(null, 'a[ui-sref="app.assignments"]', 'Séances envoyées');
  eleves: BasicAccessor = new BasicAccessor(null, 'a[ui-sref="app.groups"]', 'Mes élèves');
  tableauBord: BasicAccessor = new BasicAccessor(null, 'a[ui-sref="app.statistics-v2"]', 'Mes ressources');
  evalCognitives : BasicAccessor = new BasicAccessor(null, 'a[ui-sref="app.cognitiveAssesmentInfo"]', 'Mes ressources');
  forum: BasicAccessor = new BasicAccessor(null, 'a[gt-institution-translate="MODULE_FORUM_MENU"]', 'Mes ressources');
  msg: BasicAccessor = new BasicAccessor(null, 'a[ui-sref="app.messaging"]', 'Mes ressources');

  constructor(){
    this.ressources = new GtLMSTabRessources();
  }
}


export class GtLMSUser extends BasicAccessor{
  myProfile : BasicAccessor = new BasicAccessor(null, 'a[ui-sref="myprofile"]');
  logout : BasicAccessor = new BasicAccessor(null, 'a.logout');
}
