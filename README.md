# test_sites_gt
Tests fonctionnels automatiques des sites développés par GT pour Humensis : Digithèque, La Fabrique connectée et Les Cahiers connectés

## Installation
Ces tests fonctionnels nécessitent d'installer 
* NodeJS (version 9.4 au début du dev)
* Nightwatch (`npm install -g nightwatch`)\
 N.B : Ici le module est installé en global pour faciliter le lancement de la commande
* Drivers pour les différents navigateurs : https://www.npmjs.com/package/selenium-webdriver#installation \
 *Attention: Le bon driver pour Chrome n'est pas forcément évident à trouver.*\
 *Par exemple, lors de développement la dernière version de Chrome est la v64 mais il ne faut pas utiliser le dernier driver proposé (v2.9) mais la v2.35 !*

*info : Ce code utilise les module suivants (déjà dans package.json):*\
* *Modules NodeJS :* 
  * *Selenium Web Driver (`npm install selenium-webdriver`)* 
  * *Nightwatch HTML reporter (`npm install nightwatch-html-reporter`)*

## Exécution des tests
Pour lancer les tests sur Firefox (par défaut), il suffit d'ouvrir un terminal (Powershell sur Windows pour une meilleure lisibilité) dans le dossier du projet et de saisir "`nightwatch`".

Cependant, afin d'obtenir un rapport HTML plus facilement exploitable il faut entrer "`nightwatch --reporter ./html-reporter.js -e default,chrome`".\
Ou en version plus courte : "`nightwatch -r ./html-reporter.js`"

Pour les autres navigateurs il faut explicement préciser l'environnement (-e) dans la ligne de commande :\
`nightwatch -r ./html-reporter.js -e firefox,chrome,edge`

*N.B : Pour Edge, lors de l'arrêt des tests le navigateur est entièrement fermé, avec tous les anciens onglets, contrairement à Chrome ou Firefox où seule la nouvelle fenêtre, ouverte pour lancer les tests, est fermée.*

Pour le moment, impossible de lancer les navigateurs Opéra et Safari pour les tests.
