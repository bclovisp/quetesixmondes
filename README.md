# La Quête des Six Mondes

Jeu de questions en français pour un explorateur de 7 ans. 180 questions, six mondes,
trois niveaux de difficulté qui s'adaptent tout seuls.

Application web (PWA) : un seul fichier HTML, aucune dépendance à installer,
fonctionne hors ligne après une première ouverture connectée.

## Mise en ligne sur GitHub Pages

1. Créer un dépôt **public** (les GitHub Pages gratuites exigent un dépôt public).
2. Déposer les fichiers de ce dossier **à la racine** du dépôt.
3. `Settings` → `Pages` → Source : *Deploy from a branch*, branche `main`, dossier `/ (root)` → `Save`.
4. Attendre une à deux minutes. L'adresse est `https://UTILISATEUR.github.io/DEPOT/`.

## Installation sur iPhone

1. Ouvrir l'adresse **dans Safari** (Chrome iOS ne propose pas l'ajout à l'écran d'accueil).
2. Bouton Partager → `Sur l'écran d'accueil` → `Ajouter`.
3. L'icône apparaît comme une vraie application, se lance en plein écran et marche sans réseau.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Le jeu entier : interface, logique, 180 questions |
| `manifest.json` | Nom, icônes et mode plein écran pour l'écran d'accueil |
| `sw.js` | Service worker : mise en cache pour le hors ligne |
| `apple-touch-icon.png` | Icône utilisée par iOS (180 px) |
| `icon-192.png`, `icon-512.png` | Icônes Android et navigateurs |

## Réglages utiles

Dans `index.html` :

- `const SEUIL = 3;` — secondes de réflexion à respecter avant d'afficher les réponses
  pour obtenir l'étoile bonus.
- `const Q = { ... }` — la banque de questions, organisée par monde puis par niveau
  (`Explorateur`, `Aventurier`, `Maître`). Chaque entrée : `q` la question, `o` les trois
  options, `a` l'indice de la bonne réponse (0, 1 ou 2), `e` l'explication affichée après coup.
- `const NOMS_TROPHEE = [ ... ]` — les noms attribués aux trophées successifs.

## Mise à jour

Le service worker interroge le réseau en premier et ne se sert du cache qu'en dépannage :
un nouveau dépôt de `index.html` sur GitHub est donc pris en compte à la prochaine
ouverture connectée, sans avoir à vider quoi que ce soit.

## Données

La progression (parts, trophées, étoiles, série de jours, niveaux par monde) est stockée
dans le navigateur de l'appareil, en local. Rien n'est envoyé nulle part et il n'y a aucun
compte à créer. Supprimer l'application de l'écran d'accueil efface la progression.

Les polices de caractères sont chargées depuis Google Fonts à la première ouverture.
Hors ligne et avant ce premier chargement, le jeu utilise les polices du système :
la mise en page reste correcte.
