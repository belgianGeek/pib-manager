:point_right: As this software is intended to be used in French-speaking libraries, the following README is written in French.

# Introduction

Ce programme est une application web qui a pour but de faciliter la gestion des prêts interbibliothèques (PIB) dans les institutions où les SIGB ne permettent pas de les gérer efficacement. Il a vu le jour au mois de mars 2020 afin d'automatiser certaines tâches chronophages et répétitives et ainsi faciliter le travail des bibliothécaires et leur permettre de dégager plus de temps à consacrer à l'accueil et au renseignement des lecteurs.

_PIB Manager_ a été créé sur mesure pour la bibliothèque de Perwez, dans le Brabant wallon (Belgique) en association avec le logiciel Adlib.

![Page d'accueil de _PIB Manager_](https://raw.githubusercontent.com/belgianGeek/pib-manager/master/screenshots/home.jpg)

# Prérequis

Afin de fonctionner de manière optimale, cette application nécessite les éléments suivants :

- Elle doit être installée dans un environnement de type Linux
- Un serveur de base de données [PostgreSQL](https://www.postgresql.org) en version `<= 9`
- [Node.js](https://nodejs.org) en version `<= 10`

Le serveur de base de données et la plateforme Node.js peuvent être installés très facilement depuis le gestionnaire de paquets de la distribution Linux utilisée (par exemple, sous Ubuntu/Debian via la commande `sudo apt install -y nodejs postgresql`, consultez la documentation de votre distribution si celle-ci n'est pas basée sur Debian).

# Mise en place

## Téléchargement et installation

:point_right: Ces instructions peuvent paraître compliquées à suivre pour tout qui n'est pas familier avec le domaine de l'informatique. N'hésitez donc pas à [ouvrir une issue](https://github.com/belgianGeek/pib-manager/issues/new) afin d'obtenir de l'aide.

Le logiciel _PIB Manager_ peut être téléchargé et installé en quelques clics, une fois les prérequis satisfaits.

Pour télécharger le programme, vous pouvez soit cloner ce dépôt dans un dossier sur votre ordinateur (attention, cela nécessite d'avoir installé [Git](https://git-scm.com/) au préalable !) via la commande `git clone https://github.com/belgianGeek/pib-manager.git /home/$user/Documents/pib-manager` ou simplement télécharger l'ensemble des fichiers au format `.zip` et les déplacer ensuite dans le dossier de votre choix sur votre ordinateur.

Le serveur de base de données PostgreSQL doit être actif pour assurer le bon fonctionnement du logiciel. Pour démarrer le service, vous pouvez donc entrer dans la commande `sudo systemctl start postgresql` dans un terminal. Afin que le service soit démarré à chaque allumage de votre ordinateur, vous devez exécutez la commande `sudo systemctl enable postgresql`.

Pour finaliser l'installation, vous devez créer le fichier `pib.service` dans le dossier `/etc/systemd/system`, avec le contenu suivant :

```
[Unit]
Description=PIB Manager
After=network.target

[Service]
Type=simple
User=votre-nom-ici
WorkingDirectory=dossier-de-pib-manager/
ExecStart=/usr/bin/node dossier-de-pib-manager/index.js
Restart=always

StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=PIB

Environment=NODE_ENV=production
PORT=4700

[Install]
WantedBy=multi-user.target
```
Ce fichier permet de créer un service dédié au logiciel. Si la création de ce fichier est indispensable au bon fonctionnement du logiciel, le modèle montré ci-dessus doit être adapté à votre configuration : remplacez donc `votre-nom-ici` par votre nom d'utilisateur et `dossier-de-pib-manager` par le dossier où sont stockés les fichiers du programme.

## Configuration

Avant de lancer le programme, quelques informations pratiques doivent être indiquées dans un fichier. Rendez-vous dans le dossier d'installation du logiciel et crééez un fichier nommé `.env`. Cela fait, remplissez-le selon le schéma suivant :

```
LIBRARY=nom de la bibliothèque
MAIL_SENDER=adresse email à partir de laquelle seront envoyés les mails aux lecteurs
PG_PASSWD=mot de passe de connexion à la base de données
SMTP_PASSWD=mot de passe utilisé pour se connecter au compte de courrier noté plus haut
SMTP_HOST=serveur mail chargé d'envoyer les mails (par exemple, gmail.com pour une adresse Gmail)
```

## Ajout des code-barres

Tout livre ne pouvant circuler sans code-barres, vous devez ajouter vos code-barres dans un fichier intitulé `codes-barres.json`, placé dans le dossier `barcodes`. Le contenu étant soumis à une syntaxe précise, un modèle est inclus dans le dossier.

## Ajout des lecteurs

Si vous le désirez, vous pouvez également ajouter l'ensemble de vos lectrices et lecteurs dans le programme en créeant un fichier intitulé `lecteurs.csv`. ce fichier doit être placé dans le dossier d'installation de _PIB Manager_ pour que l'import fonctionne.

:warning: Notez bien que le logiciel a été développé pour une bibliothèque du Brabant Wallon. Ce fichier plus que tout autre élément respecte donc une forme particulière, qu'il est difficile de reproduire. Si votre bibliothèque n'utilise pas le SIGB Adlib, afin d'éviter toute erreur, il est conseillé d'ajouter chaque lecteur via le menu dédié ([cf. Fonctionnalités](#fonctionnalités)).

Pour lancer le logiciel, il suffit d'entrer la commande `sudo systemctl start pib`. Pour qu'il se lance au démarrage de l'ordinateur, exécutez la commande `sudo systemctl enable pib`.

Enfin, pour obtenir le lien de connexion à l'interface du programme, entrez la commande `sudo systemctl status pib`. Le lien se trouve sur la première ligne affichée.

Vous pouvez dès lors vous connecter à l'interface de _PIB Manager_ en collant le lien récupéré à l'étape précédente dans votre navigateur web favori.

# Fonctionnalités

Cet outil vous permet de gérer le plus efficacement possible vos demandes de prêt interbibliothèques. Pour cela, vous avez plusieurs onglets :

## Depuis la page d'accueil...

- Le bouton _Rentrer une nouvelle demande_ vous permet d'introduire une demande d'emprunt ou de prêt externe.
- Le menu _Suivre un emprunt_ vous permettra de terminer le traitement du document à son arrivée à la bibliothèque mais aussi de prévenir le lecteur concerné.
- Enfin, deux menus de retour vous permettront de renvoyer le document dans sa bibliothèque d'origine dès son retour dans votre bibliothèque.

## Via le menu "hamburger"...

Le menu "hamburger" accessible sur la gauche de l'interface d'autres options, plus avancées :

- Un lien vers l'interface de recherche
- Un menu d'ajout de lecteur
- Un outil d'export des demandes (pratique si vous voulez les travaillez dans un fichier Excel :wink:)
- Un menu de _Requêtes express_, pratique si vous devez encoder une demande pour plus tard et que vous n'avez pas le temps d'effectuer toute la procédure
- Un petit menu _Paramètres_, grâce auquel vous pourrez par exemple modifier le contenu du mail de confirmation envoyé aux lecteurs
- Un petit menu _À propos_, qui vous permet par exemple de vérifier la disponibilité de mises à jour logicielles
- Enfin, le bouton _Quitter_ vous mènera à deux options vous permettant d'éteindre ou de redémarrer le programme

## Interface de recherche

![Interface de recherche de _PIB Manager_](https://raw.githubusercontent.com/belgianGeek/pib-manager/master/screenshots/search.jpg)

Ce module vous permet de rechercher, supprimer et modifier les demandes traitées.

Pour effectuer une recherche, vous devez au moins sélectionner un type de demande (requête express, prêt ou emprunt). Vous pouvez également filtrer les résultats obtenus grâce aux deux champs additionnels présents sur l'interface.

L'ensemble des actions possibles pour chaque demande (modification ou suppression par exemple) est visualisable en effectuant un clic-droit sur une demande.

# Un problème, une question ?

N'hésitez pas à poser une question sur [Github](https://github.com/belgianGeek/pib-manager/issues/new) ou à [me contacter par mail](mailto:max@maxvdw.ovh).

# Licence

Ce logiciel est mis à la disposition de tous, gratuitement et selon les termes de la licence GNU-GPL v3.
