import { BasicAccessor } from "./basic_accessor";
import { GtLMSSite } from "../GtLmsTemplate";

export class GtLMSLoginPage extends BasicAccessor{
  register : BasicAccessor;
  login : BasicAccessor;
  pwdLost : BasicAccessor;

  constructor(site: GtLMSSite) {
    super(null, 'body', '', 'Page d\'authentification');
    this.register = new BasicAccessor(this, 'button.auth-register', 'S\'ENREGISTRER', '', site.colors.buttons.secondary.background, site.colors.buttons.secondary.text);
    this.login = new BasicAccessor(this, 'button.btn-login', 'SE CONNECTER', '', site.colors.buttons.default.background, site.colors.buttons.default.text);
    this.login = new BasicAccessor(this, 'button.btn-login');
    this.pwdLost = new BasicAccessor(this, 'a[ui-sref="auth.password.lost"]', 'Mot de passe oublié ?', '', null, site.colors.main.activeColor);
  }
}

