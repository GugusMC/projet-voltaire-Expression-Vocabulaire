# Voltaire Vocab Helper – Extension Chromium

Une extension Chromium simple et efficace pour vous aider à réussir la partie **Vocabulaire du Projet Voltaire**.

Elle affiche automatiquement la **bonne définition des mots** en s’appuyant sur une **IA locale**, tout en construisant une base de données réutilisable et modifiable.

---

## 🚀 Fonctionnalités

* 📖 Affichage instantané de la bonne définition
* 🤖 Utilisation d’une IA locale (*Meta Llama 3 8B Instruct*) grâce à LM Studio
* 💾 Sauvegarde automatique des réponses dans une base de données
* ✏️ Modification manuelle facile des définitions
* 📂 Import/export de bases de données
* 🖥️ Console intégrée (désactivable)

![image](https://github.com/GugusMC/projet-voltaire-Expression-Vocabulaire/blob/4d14d9d8dfaaa9e477cc0e9063b9f19318b2aaea/Image/Image%201.png)

---

## ⚙️ Installation de l’extension

1. Téléchargez ou clonez ce dépôt
2. Ouvrez un navigateur Chromium (ex: Brave ou Chrome)
3. Allez dans vos extentions
4. Activez le **mode développeur**
5. Cliquez sur **Charger l’extension non empaquetée**
6. Sélectionnez le dossier du projet

---

## 🎮 Utilisation

* Appuyez sur la touche **Z**
  **OU**
* Cliquez sur le bouton "ANALYSER" (en haut à droite)

➡️ L’extension analyse les choix proposés et vous affiche la bonne définition.

---

## 🧠 Installation de l’IA locale (LM Studio)

L’extension repose sur une IA locale uniquement pour crée les base de donné.
Si la base de donné de votre niveau est deja construite et est disponible dans le dépot, vous pouvez passer cette partie. Si non, voici comment la configurer :

### 1. Installer LM Studio

1. Téléchargez LM Studio : https://lmstudio.ai
2. Installez-le et lancez-le

---

### 2. Télécharger le modèle

Dans LM Studio :

1. Allez dans **Models**
2. Recherchez :

   ```
   meta-llama-3-8b-instruct
   ```
3. Téléchargez une version compatible (GGUF Q4_K_M recommandé)

---

### 3. Lancer le modèle (optionelle)

Cette partie est optionelle car le model se lancera dès la première utilisation de l'extention.

1. Ouvrez l’onglet **Chat**
2. Chargez le modèle téléchargé
3. Lancez le serveur local (API)

   * Généralement sur :

     ```
     http://localhost:1234
     ```

---

## 💾 Base de données

Les réponses trouvées sont automatiquement enregistrées.

### Format :

```json
{
    "Mot à définir": "Définition"
    "Mot à définir": "Définition"
}
```

---

### 📥 Accéder à la base

![image](https://github.com/GugusMC/projet-voltaire-Expression-Vocabulaire/blob/e1d4a49f2b10e4ea86f6e516d80757e28f894460/Image/Image%202.png)

---

### ✏️ Modifier la base

* Très simple : éditez directement la base de donné dans le cadre
* Corrigez les erreurs de l’IA si nécessaire

![image](https://github.com/GugusMC/projet-voltaire-Expression-Vocabulaire/blob/17a7472c8ff11602ef78d7397ee268fe36042b8d/Image/Capture%20d'%C3%A9cran%202026-04-25%20165907.png)

---

## 📂 Importer des bases de données

Vous pouvez importer des bases de données déjà créées en copiant le fichier `.txt`:

---

## 📁 Bases disponibles

Les bases de données sont stockées dans le dossier :

```
/datasets
```

---

## 🤝 Contribuer

Vous pouvez proposer vos bases de données:

### Étapes :

1. Créez un fichier `.txt`
2. Respectez le format :

```json
{
    "Mot": "Définition"
    "Mot": "Définition"
}
```

3. Soumettez via Pull Request


---

## 🖥️ Console intégrée

Une console est affichée par défaut en bas de la page pour vous aider au debug si vous voulez modifier le code et utiliser une clée API Gemini par exemple.

### Masquer la console :

Cliquez sur le bouton **CONSOLE**

---

## ⚠️ Limitations

* L’IA n’est **pas fiable à 100%**
* Certaines définitions peuvent être incorrectes
* D’où l’importance de :

  * corriger
  * partager

---

## 📄 Licence

Libre d’utilisation et de modification.

---

## ❤️ Remarques

Ce projet est un outil d’aide. Il ~ne~ remplace ~pas~ l’apprentissage.

---
