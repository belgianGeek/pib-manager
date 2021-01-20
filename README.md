:point_right: As this software is intented to be used in French-speaking libraries, the following README will be written in French.

# Introduction

Ce programme est une application web qui a pour but de faciliter la gestion des prêts interbibliothèques (PIB) ans les institutions où les SIGB ne permettent pas de les gérer efficacement.

Ce programme a été créé sur mesure pour la bibliothèque de Perwez, dans le Brabant wallon (Belgique) en associa tion avec le logiciel Adlib.

# Prérequis

Afin de fonctionner de manière optimale, cette application nécessite les éléments suivants :

- Elle doit être installée dans un environnement de type Linux
- Un serveur de base de données [PostgreSQL](https://www.postgresql.org) en version `<= 9`
- [Node.js](https://nodejs.org) en version `<= 10`

Le serveur de base de données et la plateforme Node.js peuvent être installés très facilement depuis le gestionnaire de paquets de la distribution Linux utilisée (par exemple, sous Ubuntu/Debian via la commande `sudo apt install -y nodejs postgresql`, consultez la documentation de votre distribution si celle-ci n'est pas basée sur Debian).

# Installation

Le logiciel _PIB Manager_ peut être téléchargé et installé en quelques clics, une fois les prérequis satisfaits.

Pour télécharger le programme, vous pouvez soit cloner ce dépôt dans un dossier sur votre ordinateur (attention, cela nécessite d'avoir installé [Git](https://git-scm.com/) au préalable !) via la commande `git clone https://github.com/belgianGeek/pib-manager.git /home/$user/Documents/pib-manager` ou simplement télécharger l'ensemble des fichiers au format `.zip` et les déplacer ensuite dans le dosseri de votre choix sur votre ordinateur.

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
Ce fichier permet de cérer un service dédié au logiciel. Si la création de ce fichier est indispensable au bon fonctionnement du logiciel, le modèle montré ci-dessus doit être adapté à votre configuration : remplacez donc `votre-nom-ici` par votre nom d'utilisateur et `dossier-de-pib-manager` par le dossier où sont stockés les fichiers du programme.

Pour lancer le logiciel, il suffit d'entrer la commande `sudo systemctl start pib`. Pour qu'il se lance au démarrage de l'ordinateur, exécutez la commande `sudo systemctl enable pib`.

Enfin, pour obtenir le lien de connexion à l'interface du programme, entrez la commande `sudo systemctl status pib`. Le lien se trouve sur la première ligne affichée.

Vous pouvez dès lors vous connecter à l'interface de _PIB Manager_ en collant le lien récupéré à l'étape précédente dans votre navigateur web favori.
