import { BasicAccessor } from "./basic_accessor";
import { GtLMSSite } from "../GtLmsTemplate";

export class GtLMSLoginPage extends BasicAccessor{
  register : BasicAccessor;
  login : BasicAccessor;
  pwdLost : BasicAccessor;

  constructor() {
    super(null, 'body', '', 'Page d\'authentification');
    this.register = new BasicAccessor(this, 'button.auth-register');
    this.login = new BasicAccessor(this, 'button.btn-login');
    this.pwdLost = new BasicAccessor(this, 'a[ui-sref="auth.password.lost"]');
  }
}

