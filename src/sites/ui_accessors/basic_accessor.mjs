"use strict";

class BasicColors {
  constructor(background, text, border) {
    this.background = (background === undefined ? null : background);
    this.text = (text === undefined ? null : text);
    this.border = (border === undefined ? null : border);
  }
}

class BasicAccessor{
  constructor(parent, cssSelector, displayedText, logLabel) {
    this.parent = parent;
    this.selector = cssSelector;
    this.colors = new BasicColors();
    this.text = (displayedText === undefined) ? '' : displayedText;
    this.logLabel = logLabel;//Pour le log dans Nightwatch
    this.activated = true;//Propriété pour indiquer si l'élément est activé/visible ou non sur le site
  }
  
  get isActivated() { 
    if(this.parent == null)
      return this.activated;
    else return (!this.activated ? false : this.parent.isActivated() );
  }
}

export default BasicAccessor;
export {BasicColors};