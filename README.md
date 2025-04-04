# PokeApp

## ✨ Projet React + TypeScript + Vite

PokeApp est une application web développée avec React et Vite, permettant d'afficher une liste de Pokémon avec pagination, recherche dynamique et affichage des détails de chaque Pokémon. L'interface est disponible en français et en anglais, avec un changement de langue instantané grâce à react-i18next. La navigation est assurée par React Router, et la gestion du state global est centralisée via useContext. Conçue avec React/vite et une architecture basée sur Atomic Design.

---

## 🌐 Fonctionnalités
- 🔍 **Recherche** : Trouvez un Pokémon par son nom
- 🗓 **Pagination** : Affichez la liste des Pokémons avec une navigation fluide
- 🌍 **Détails des Pokémons** : Consultez les informations complètes sur un Pokémon
- 🎮 **UI multilingue** : Passage dynamique entre **français** et **anglais** (via `react-i18next`)
- 💪 **Performances optimisées** : Chargement rapide grâce à **Vite** et **React Query**

---

## 🛠 Installation

1. **Cloner le projet**
```bash
git clone https://github.com/ArthurBergere/PokeApp.git
cd PokeApp
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le projet**
```bash
npm run dev
```

---

## 🔍 Technologies utilisées

| Technologie    | Raison d'utilisation |
|---------------|----------------------|
| **React**     | Bibliothèque principale |
| **TypeScript** | Typage fort pour un meilleur code |
| **Vite**      | Démarrage et build ultra-rapide |
| **React Router** | Gestion des pages |
| **React Query** | Gestion efficace des requêtes API |
| **React i18next** | Multilingue dynamique |
| **PokéAPI**   | API pour récupérer les Pokémons |

---

## 🔮 Architecture du projet

```
PokeApp/
│── src/
├── src/
│   ├── api/
│   │   └── pokeApi.ts          // Fonctions pour interagir avec la PokéAPI (gestion des appels HTTP, pagination, etc.)
│   │
│   ├── assets/                 // Ressources statiques (images, icônes, fonts…)
│   │   ├── images/
│   │   └── styles/             // Feuilles de style globales ou variables SCSS, etc.
│   │
│   ├── components/             // Composants UI, organisés par Atomic Design
│   │   ├── atoms/              // Composants les plus basiques (boutons, inputs, labels…)
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   │
│   │   ├── molecules/          // Combinaisons d’atomes (ex : carte d’un Pokémon)
│   │   │   └── PokemonCard.tsx
│   │   │
│   │   ├── organisms/          // Composants plus complexes, souvent des sections entières (ex : liste paginée de Pokémon)
│   │   │   └── PokemonList.tsx
│   │   │
│   │   └── templates/          // Mises en page réutilisables qui encadrent des pages complètes
│   │       └── MainLayout.tsx
│   │
│   ├── contexts/               // Contexts React pour partager des données globales
│   │   ├── LocaleContext.tsx   // Pour gérer la langue (avec react-i18next ou custom)
│   │   └── AppContext.tsx      // Autres contextes (ex : thème ou état global)
│   │
│   ├── hooks/                  // Hooks personnalisés pour la logique métier (ex : usePokemon pour gérer l’appel à la PokéAPI)
│   │   └── usePokemon.ts
│   │
│   ├── i18n/                   // Configuration et fichiers de traduction
│   │   ├── index.ts            // Initialisation de react-i18next
│   │   └── locales/            
│   │       ├── en.json         // Traductions en anglais
│   │       └── fr.json         // Traductions en français
│   │
│   ├── pages/                  // Pages principales, chaque membre peut y développer sa propre page
│   │   ├── Home.tsx            // Page d’accueil avec liste et recherche
│   │   └── PokemonDetail.tsx   // Page détaillée d’un Pokémon
│   │
│   ├── routes/                 // Définition du routage (avec React Router ou TanStack Router)
│   │   └── AppRoutes.tsx
│   │
│   ├── services/               // Services métiers et logique de gestion (ex : pokemonService.ts pour orchestrer les appels API et le traitement)
│   │   └── pokemonService.ts
│   │
│   ├── utils/                  // Fonctions utilitaires et helpers
│   │   └── helpers.ts
│   │
│   ├── App.tsx                 // Composant racine qui inclut les routes, les providers (context, i18n, etc.)
│   └── main.tsx                // Point d’entrée de l’application (injection dans index.html via Vite)
│
│── public/
│── package.json
│── vite.config.ts
```

---

## 🏆 Équipe

Projet réalisé par :
- 👨‍💻 **Abdelhakim Elakrouti**
- 👨‍💻 **Emre Arslanhan**
- 👨‍💻 **Arthur Bergere**

---

## 📑 Licence
Ce projet est open-source et sous licence MIT.

---

💪 **Prêts à capturer tous les Pokémons ?** Démarrez l'application et amusez-vous ! 🌟


