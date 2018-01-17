# test_sites_gt
Tests fonctionnels automatiques des sites développés par GT pour Humensis : Digithèque, La Fabrique connectée et Les Cahiers connectés

Ces tests fonctionnels nécessitent d'installer 
* NodeJS (version 9.4 au début du dev)
* Modules NodeJS :
  * Selenium Web Driver (`npm install selenium-webdriver`)
  * Nightwatch (`npm install nightwatch`)
* Drivers pour les différents navigateurs : https://www.npmjs.com/package/selenium-webdriver#installation

Pour lancer les tests sur Firefox (par défaut), il suffit d'ouvrir un terminal dans le dossier du projet et de saisir "`nightwatch`".\
Pour les autres navigateurs il faut explicement préciser l'environnement dans la ligne de commande :\
`nightwatch -e default,chrome,edge,safari`

*N.B : Pour le moment, seul Firefox et Edge fonctionnent.*\
*N.B 2 : Pour Edge, lors de l'arrêt des tests le navigateur, et tous les anciens onglets, est entièrement fermé contrairement à Chrome ou Firefox où seule la nouvelle fenêtre, ouverte pour lancer les tests, est fermée.*
