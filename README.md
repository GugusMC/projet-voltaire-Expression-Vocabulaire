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

---

## ⚙️ Installation de l’extension

1. Téléchargez ou clonez ce dépôt
2. Ouvrez un navigateur Chromium (ex: Brave ou Chrome)
3. Allez dans : `chrome://extensions/`
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

L’extension repose sur une IA locale uniquement pour crée les base de donné, si la base de donné de votre niveau est deja construite dans le dépot, vosu pouvez passer cette partie. Si non, voici comment la configurer :

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
}
```

---

### 📥 Accéder à la base

1. Cliquez sur les **3 petits points** de l’extension
2. Cliquez sur **Options**

---

### ✏️ Modifier la base

* Très simple : éditez directement le JSON
* Corrigez les erreurs de l’IA si nécessaire

---

## 📂 Importer des bases de données

Vous pouvez importer des bases déjà créées :

* Format : `.txt` ou `.json`
* Structure identique au format ci-dessus

---

## 📁 Bases disponibles

Les bases de données sont stockées dans le dossier :

```
/datasets
```

(ex : niveaux, thèmes, etc.)

---

## 🤝 Contribuer

Vous pouvez proposer vos bases de données :

### Étapes :

1. Créez un fichier `.txt` ou `.json`
2. Respectez le format :

```json
{
    "Mot": "Définition"
}
```

3. Soumettez via Pull Request

---

### ✅ Validation des bases (important)

Pour éviter les erreurs :

* Vérifiez chaque définition manuellement
* Testez votre base avec l’extension
* Ajoutez une description du niveau concerné

👉 Pour automatiser la validation, vous pouvez :

* Ajouter un script qui compare les réponses avec une base de référence
* Ou créer une “base validée” séparée (`/validated_datasets`)

---

## 🖥️ Console intégrée

Une console est affichée par défaut en bas de la page :

* Permet de voir ce que fait l’IA
* Aide au debug

### Masquer la console :

Cliquez sur le bouton **CONSOLE**

---

## 🖼️ Ajouter des images au README

### Étapes :

1. Créez un dossier :

```
/images
```

2. Ajoutez vos images (ex : `demo.png`)

3. Dans le README, utilisez :

```markdown
![Description](images/demo.png)
```

---

### Exemple :

```markdown
![Interface](images/interface.png)
```

---

## ⚠️ Limitations

* L’IA n’est **pas fiable à 100%**
* Certaines définitions peuvent être incorrectes
* D’où l’importance de :

  * vérifier
  * corriger
  * partager

---

## 📌 Roadmap (idées)

* Amélioration de la précision IA
* Synchronisation cloud des bases
* Interface d’édition plus avancée
* Système de validation communautaire

---

## 📄 Licence

Libre d’utilisation et de modification.

---

## ❤️ Remarques

Ce projet est un outil d’aide. Il ne remplace pas l’apprentissage.

---
