import { BasicAccessor } from "./basic_accessor";
import { GtLMSSite } from "../GtLmsTemplate";

export class GtLMSTabRessources extends BasicAccessor{
  tabsCont : BasicAccessor;
  tabSelected : BasicAccessor;
  tabUnselected : BasicAccessor;
  tabs: Array<RessSubTab>;
  waitMsg : BasicAccessor;

  constructor() {
    super(null, 'a[ui-sref="app.resources"]', 'Ressources');
    this.tabsCont = new BasicAccessor(this, 'div.gt-tabs-menu');
    this.tabSelected = new BasicAccessor(this, 'div.gt-tabs-menu__item--active');
    this.tabUnselected = new BasicAccessor(this, 'div.gt-tabs-menu__item:not(.gt-tabs-menu__item--active)');
    this.tabs = [new RessSubTab(this, 'div[ui-sref="app.resources"]', 'Exercices/Documents', 'learning-object'),
                  new RessSubTab(this, 'div[ui-sref="app.resources.modules"]', 'Séances', 'module'),
                  new RessSubTab(this, 'div[ui-sref="app.resources.shared"]', 'Séances partagées', 'module')
                ];
    this.waitMsg = new BasicAccessor(this, 'div.gt-loader');
  }
}

class RessListHeader extends BasicAccessor{
  search: RessSearchBar = new RessSearchBar(this, 'search div.search');
  favorites_toggle : BasicAccessor = new BasicAccessor(this, 'favorites-toggle');
  btnNouvSeance : BasicAccessor = new BasicAccessor(this, 'button.new-module', 'CRÉER UNE SÉANCE');
  btnSelection : BasicAccessor = new BasicAccessor(this, 'button.basket-button', 'Ma sélection (0)');

  constructor(ressTab: GtLMSTabRessources){
    super(ressTab, 'list-header');
  }
}
class RessSearchBar extends BasicAccessor{
  ico : BasicAccessor = new BasicAccessor(this, 'i.fa-search');
  input : BasicAccessor = new BasicAccessor(this, '.search input[type="search"]');
  placeholder : BasicAccessor = new BasicAccessor(this, '.search input[type="search"]::placeholder');//pseudo-classe inaccessible ?

}


class RessSubTab extends BasicAccessor{
  ligneRess: RessListObject;
}
class RessSubTabExoDocs extends RessSubTab{
  constructor(parent: GtLMSTabRessources, cssSelector: string, label: string, ressTag: string){
    super(parent, cssSelector, label);
    this.ligneRess = new RessListExoDoc(this);
  }
}
class RessSubTabSeances extends RessSubTab{
  constructor(parent: GtLMSTabRessources, cssSelector: string, label: string, ressTag: string){
    super(parent, cssSelector, label);
    this.ligneRess = new RessListSeance(this);
  }
}

class RessListObject{
  parent: RessSubTab;
  tag: string;
  cover : BasicAccessor;
  infos : BasicAccessor;
  title : BasicAccessor;
  author : BasicAccessor;
  description : BasicAccessor;
  metas : BasicAccessor;
  actions : BasicAccessor;
  fav : BasicAccessor;
  infos_popup : BasicAccessor;//Instancié dans les classes filles
  more_actions : BasicAccessor;
  more_actions_container : BasicAccessor;
  more_actions_item : BasicAccessor;

  constructor(parentSubTab: RessSubTab, tag: string){
    this.parent = parentSubTab;
    this.tag = tag;
    this.cover = new BasicAccessor(parentSubTab, tag + ' div.cover');
    this.infos = new BasicAccessor(parentSubTab, tag + ' div.infos');
    this.title = new BasicAccessor(parentSubTab, tag + ' .title');
    this.author = new BasicAccessor(parentSubTab, tag + ' .author');
    this.description = new BasicAccessor(parentSubTab, tag + ' .description');
    this.metas = new BasicAccessor(parentSubTab, tag + ' div.metas div.meta');
    this.actions = new BasicAccessor(parentSubTab, tag + ' div.actions');
    this.fav = new BasicAccessor(parentSubTab, tag + ' .action.favorite i.fa-star-o');
    this.more_actions = new BasicAccessor(parentSubTab, this.tag + ' div.dropdown-actions');
    this.more_actions_container = new BasicAccessor(parentSubTab, this.tag + ' div.dropdown-menu');
    this.more_actions_item = new BasicAccessor(parentSubTab, this.more_actions_container.selector + ' a.action');
    //this.infos_popup créé dans les classes filles
  }
}
class RessListExoDoc extends RessListObject{
  preview : BasicAccessor;
  add: BasicAccessor;
  constructor(parentSubTab: RessSubTab){
    super(parentSubTab, 'learning-object');
    this.parent = parentSubTab;
    this.add = new BasicAccessor(parentSubTab, this.tag + ' .action.lo-add');
    this.preview = new BasicAccessor(parentSubTab, this.tag + ' .action.lo-preview');
    this.infos_popup = new BasicAccessor(parentSubTab, this.tag + ' .action.lo-edit-meta2');
    //TODO : Ajouter la liste des actions supplémentaires => Vérification du nombre et des textes
  }
}
class RessListSeance extends RessListObject{
  webreader : BasicAccessor;
  constructor(parentSubTab: RessSubTab){
    super(parentSubTab, 'module');
    this.parent = parentSubTab;
    //TODO : infos_popup : Sélecteur pas évident => OK ?
    this.infos_popup = new BasicAccessor(parentSubTab, this.tag + ' .action .fa-stack-2x');
    this.webreader = new BasicAccessor(parentSubTab, this.tag + ' .webreader a');
    //TODO : Ajouter la liste des actions supplémentaires => Vérification du nombre et des textes
  }
}
