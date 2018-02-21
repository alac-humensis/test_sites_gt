import { GtLMSSite } from "./GtLmsTemplate";
import { Filter } from "./structure/filter";

export class Digitheque extends GtLMSSite {
  constructor() {
    super();
    this.struct.filterSidebar.filters.push(new Filter(this.struct.filterSidebar, 'discipline', 'DISCIPLINE', true));
    this.struct.filterSidebar.filters.push(new Filter(this.struct.filterSidebar, 'dominante', 'DOMINANTE', false));
    this.struct.filterSidebar.filters.push(new Filter(this.struct.filterSidebar, 'niveau', 'NIVEAU', false));
    this.accounts.prof.login = 'alexandre.lac@editions-belin.fr';
    this.accounts.prof.password = 'Digitest';
  }
  ////  Fonctions à surcharger dans les classes filles  ////
  get siteName(){
    return 'Digithèque';
  }
  get url(){
    return 'http://enseignant.digitheque-belin.fr';
  }
  ////  FIN Fonctions à surcharger dans les classes filles  ////

}