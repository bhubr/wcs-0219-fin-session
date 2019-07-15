# Configuration app full-stack avec Lerna, Husky, ESLint

[Lerna](https://lerna.js.org/) permet de gérer des projets JavaScript constitués de plusieurs "packages".

Sur une application full-stack, il peut être compliqué de gérer différentes configurations ESLint entre le front et le back, et de lancer ESLint sur les deux en une seule commande.

Lerna permet de résoudre cela : le back est un package, le front en est un autre. Lerna permet de lancer le même "script NPM" sur tous les packages (par exemple `npm start` sur le back et le front à la fois).

[Husky](https://github.com/typicode/husky) permet de gérer des "git hooks". Les [hooks Git](https://fr.atlassian.com/git/tutorials/git-hooks) permettent de lancer des actions, lorsqu'un certain évènement se produit (commit, push, etc.).

Ici, on va configurer Husky pour lancer ESLint sur le hook Git de "pré-commit", de façon à empêcher le commit s'il y a des erreurs ESLint. Combiné à Lerna, la vérification du code par ESLint va se faire à la fois sur le back et le front, mais avec des paramètres de configuration ESLint différents pour chacun.

## Initialisation du dépôt Git

Ça, vous connaissez déjà ! Dans le (nouveau) répertoire où vous voulez stocker votre projet : `git init`

**Une fois que c'est fait**, je vous conseille d'ouvrir le **dossier** de votre projet dans VSCode, puis d'ouvrir ce fichier Markdown dans l'éditeur, comme ça vous pourrez avoir sous les yeux la doc et le terminal de VSCode, plutôt que de changer sans arrêt de fenêtre !

## Initialisation de l'application React (ou des applications React)

Si vous avez une seule app React, lancez à la racine du repo :

    create-react-app front

Si vous avez des apps séparées (une app publique, une app spécifique pour l'administration du site), lancez à la racine du repo :

    create-react-app front-admin
    create-react-app front-public

Bien sûr les noms peuvent être changés (par exemple `admin` et `public`).

## Initialisation de l'application Node / Express

Créez un dossier `back` puis placez-vous dans ce dossier. Initialisez le `package.json` :

    npm init

On peut rajouter `--yes` pour le faire en mode non-interactif, et garder toutes les valeurs proposées par défaut.

Il ne faudra pas oublier de créer un `.gitignore`, puis d'installer les dépendances. C'est plus compliqué que pour React et c'est normal : `create-react-app` crée le dossier, éventuellement même le dépôt Git (si on n'est pas déjà dans un dépôt Git), crée le `package.json`, et installe toutes les dépendances nécessaires ! Là, on fait la même chose, à la main...

On peut créer juste le squelette de l'application pour l'instant :

```javascript
// app.js, server.js ou index.js
const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Serveur running, port:', port);
  }
});
```

On peut ensuite ajouter une clé `start` dans l'objet `scripts` du `package.json`, juste au-dessus de `test` :

```
  ...
  "scripts": {
    "start": "npx nodemon app",
    "test: "echo \"Error: no test specified\" && exit 1"
  }
  ...
```

Il faut avoir installé `nodemon` localement`, en tant que dépendance de développement :

    npm i --save-dev nodemon

Puis on peut tester avec `npm start` que le serveur se lance.

## Installation de lerna

D'abord, **à la racine de votre repo**, initialiser un `package.json`, puis installer Lerna (`--save-dev` pour l'installer en tant que dépendance de développement) :

    npm install --save-dev lerna

Ensuite, pour fonctionner, Lerna a besoin d'un fichier `lerna.json`, qu'on peut créer en lançant (toujours à la racine du repo):

    npx lerna init

Voici le fichier `lerna.json` généré :

```json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0"
}
```

Dans cet objet, l'attribut `packages` contient un tableau de répertoires. `packages/*` signifie que lerna référence _tous les sous-dossiers_ du dossier `packages`.

On va ici modifier ce `lerna.json`. La configuration par défaut est en effet adaptée aux "gros" projets Open Source (voici par exemple la [liste des packages du projet React](https://github.com/facebook/react/tree/master/packages)).

Mais pour un projet perso, vous aurez souvent juste deux dossiers `front`, `back` (ou trois dossiers `front-admin`, `front-public` et `back` si vous faites une app d'admin séparée). On pourrait les mettre sous le dossier `packages`, mais par simplification, on va les mettre à la racine du repo. On va donc modifier `lerna.json` pour référencer ces deux (ou trois) packages :

```json
{
  "packages": [
    "back",
    "front"
  ],
  "version": "0.0.0"
}
```

Le premier moment de vérité : on peut vérifier que Lerna peut lancer à la fois le front et le back, comme-ceci :

    npx lerna run start --stream

Petite explication : `npx` permet de lancer une commande d'un module installé dans `node_modules`, sans nécessiter d'installer ce module en global. On aurait pu installer Lerna avec `npm i -g lerna` et dans ce cas écrire `lerna` au lieu de `npx lerna`.

`npx lerna run <script>` permet de spécifier un _script_ à exécuter sur tous les packages référencés dans `lerna.json`. `<script>` est à remplacer par un paramètre, qui correspond à une clé se trouvant dans l'objet
`scripts` des `package.json` des dossiers `front` et `back`.

Enfin `--stream` permet d'afficher les `console.log` des applications, au fur et à mesure qu'ils sont générés. Sans ce paramètre, ils seraitent affichés seulement à la fin d'une app : sauf que l'application serveur, ou même le mini serveur généré par Create React App, ne sont jamais censés "quitter" : on les interrompt avec Ctrl+C (sortie forcée), ce qui fait que sans `--stream`, `npx lerna run start` n'affiche rien.

## Installation de ESLint

### Côté back

Installer ESLint :

    npm install --save-dev eslint

Puis créer son fichier de configuration :

    npx eslint --init

Choisir:
* To check syntax, find problems, and enforce code style 
* CommonJS (require/exports) (on pourrait configurer le back de façon à utiliser les mêmes `import` / `export` que dans une app React, mais c'est un autre sujet !)
* None of these (c'est le back, pas de vérification du JSX ou autre, _sauf_ si on voulait faire du rendu de l'app React côté serveur, là aussi c'est un autre sujet)
* **Attention** à ne pas valider tout de suite avec entrée: il faut **désélectionner Browser** avec la touche espace, puis **sélectionner Node** de la même façon
* Use a popular style guide
* Airbnb
* JSON ou JavaScript (peu importe, c'est juste le format du fichier de configuration)
* Would you like to install them now with npm? répondre **Y** ou valider simplement avec entrée

Les modules nécessaires à la configuration d'ESLint vont s'installer automatiquement. Une fois que c'est fait, vous pouvez ajouter un fichier `.eslintignore` contenant `node_modules` (même si normalement il les ignore par défaut). Ce fichier contient les fichiers qu'on ne veut pas qu'ESLint vérifie. Il faut éviter ça pour son propre code (_obviously_), mais si d'aventure on récupère un code extérieur sans passer par NPM, trop ancien pour passer ESLint sans de lourdes modifications, ça peut être utile (quoique ce doive être rarissime car on trouve tout sur NPM).

Vous pouvez aussi ajouter une clé `lint` dans les `scripts` du `package.json` qu'on a déjà modifiés pour y ajouter `start` :

    ...
    "scripts": {
      "lint": "npx eslint --fix .",
      "start": "npx nodemon app",
      "test: "echo \"Error: no test specified\" && exit 1"
    }
    ...

On peut alors lancer `npm run lint` (ou `yarn lint`) pour lancer ESLint en mode "auto-fix" (`--fix`) sur le répertoire courant (`.`).

### Côté front

ESLint est déjà installé et pré-configuré par CRA (Create React App), mais est assez "laxiste" par défaut. On va initialiser une configuration qui va prendre le pas sur celle par défaut de CRA.

    npx eslint --init

Choisir :
* To check syntax, find problems, and enforce code style 
* JavaScript modules (import/export) 
* React
* Browser
* Use a popular style guide
* Airbnb
* JSON (ici ça peut être pratique car on peut éventuellement copier-coller la config ESLint générée, pour la mettre à la place de `eslintConfig` dans le `package.json`)
* Would you like to install them now with npm? répondre **Y** ou valider simplement avec entrée

Vous pouvez ensuite faire les mêmes manipulations que côté back :
* création d'un `.eslintignore`. Vous pouvez y indiquer `src/serviceWorker.js` pour qu'il ne vous embête pas avec du code généré par défaut par CRA, auquel vous n'avez pas besoin de toucher !
* ajout d'une clé `lint` dans les `scripts` du `package.json`, avec cette fois-ci : `npx eslint --fix src/` (le code source de l'app étant sous `src`)

### On vérifie que ça marche !

Deuxième moment de vérité : avec Lerna, lancer le script `lint` sur le front et le back à la fois. Ceci se fait en se replaçant à la racine et en lançant :

    npx lerna run lint

Cela vous permet à tout moment de _linter_ votre code en ligne de commande.

## Installation et configuration de `lint-staged`

Sous `back`, puis sous `front`, on va installer le module `lint-staged`, qui lance ESLint sur les fichiers "staged" (= ajoutés avec `git add`). C'est pourquoi il ne faudra pas oublier de refaire `git add` après les corrections d'erreurs ESLint !

    npm i --save-dev lint-staged

Puis il faut configurer `lint-staged` en ajoutant une section correspondante, subtilement différente entre back et front.

Côté back (ne pas oublier la virgule sur la ligne d'avant !) :

    ...
    "lint-staged": {
      "**/*.js": [
        "npx eslint --fix",
        "git add"
      ]
    }
    ...

Côté front :

    ...
    "lint-staged": {
      "src/**/*.js": [
        "npx eslint --fix",
        "git add"
      ]
    }
    ...

En gros, on indique à `lint-staged` de lancer ESLint en mode auto-fix, et de relancer `git add` pour qu'il ajoute les fichiers après avoir fait ses corrections automatiques.

## Installation et configuration de Husky

À la racine :

    npm i --save-dev husky

Enfin, on va indiquer à Husky de lancer `lint-staged` sur le hook de pré-commit, en ajoutant la section `husky` sous les `devDependencies`, dans le `package.json` situé **à la racine** :

    ...
    "devDependencies": {
        "husky": "^2.3.0",
        "lerna": "^3.14.1"
      },
      "husky": {
        "hooks": {
          "pre-commit": "npx lerna run --concurrency 1 --stream precommit"
        }
      }
    ...

Si on regarde le contenu de `hooks`, cela lance lerna : tour à tour sur `back` et `front` (`--concurrency 1`), avec l'affichage de la console (`--stream`), sur le hook de `precommit`.

Pour tester que tout fonctionne, vous pouvez rajouter des erreurs dans un fichier côté back et/ou côté front (comme un `require` d'un module tout en fin de fichier côte back), puis `git add` le tout, et normalement ESLint ne vous laissera pas passer.

Voilà, "c'est tout", enfin, façon de parler !
