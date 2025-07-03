## Structure de base recommandée pour TanStack Start :

```text
project-root/
├── src/
│   ├── routes/            # Toutes tes routes (pages + layouts)
│   │   ├── __root.tsx     # Layout racine (obligatoire)
│   │   ├── index.tsx      # Page d'accueil
│   │   ├── about.tsx      # Exemple d'autre page
│   │   └── ...            # Autres routes/pages
│   ├── router.tsx         # Configuration du router (type-safe)
│   ├── routeTree.gen.ts   # Généré automatiquement (ne pas éditer)
│   ├── components/        # Composants UI réutilisables (boutons, modales…)
│   ├── modules/           # Modules métier (workspaces, widgets…)
│   ├── hooks/             # Custom hooks
│   ├── services/          # Fonctions d’accès aux données/API/server
│   ├── store/             # Gestion d’état (Zustand, React Query…)
│   ├── types/             # Types globaux
│   ├── utils/             # Fonctions utilitaires
│   └── styles/            # Fichiers CSS/Tailwind
├── public/                # Fichiers statiques (manifest, icônes…)
├── app.config.ts          # Config globale TanStack Start
├── package.json
├── tsconfig.json
└── README.md
```

Cette structure suit les conventions TanStack Start, tout en gardant la modularité et la clarté d’un projet pro

## Explications & bonnes pratiques :

/src/routes/ :

- Chaque fichier .tsx = une route/page.

- __root.tsx = layout racine (header, sidebar, etc.), obligatoire pour TanStack Start

- Pour des sous-routes, crée des sous-dossiers (ex : /src/routes/workspaces/[workspaceId].tsx).

/src/router.tsx :

- Configure ici ton router avec le tree généré automatiquement (routeTree.gen.ts).

- Tu peux y ajouter des options globales (scrollRestoration, prefetch, etc.)

/src/components/ :

- Composants UI génériques et réutilisables (boutons, inputs, modales, layouts…).

/src/modules/ :

- Par domaine métier (ex : workspaces/, widgets/), regroupe logique, composants spécifiques, hooks, types.

/src/services/ :

- Fonctions pour accéder aux APIs, server functions, etc.

/src/store/ :

- Gestion d’état globale (Zustand, React Query, etc.).

/src/types/ :

- Types TypeScript globaux ou partagés.

/src/utils/ :

- Fonctions utilitaires pures.

/public/ :

- Fichiers statiques (favicon, manifest PWA, images…).

Spécificités TanStack Start :

- File-based routing :

    - La structure des fichiers dans /src/routes/ définit automatiquement tes routes, avec typage fort et génération automatique du route tree

- Server functions :

    - Tu peux créer des API routes et loaders directement dans tes fichiers de route, pour SSR ou data-fetching côté serveur

- Type-safety :

    - Tout est typé de bout en bout, y compris les params d’URL, loaders, actions, etc.

| Dossier/Fichier       | Rôle principal                                   |
|-----------------------|-------------------------------------------------|
| `src/routes/`         | Pages, layouts, routing automatique             |
| `src/components/`     | UI réutilisable (générique)                     |
| `src/modules/`        | Logique métier modulaire (workspaces, widgets, etc.) |
| `src/services/`       | Accès aux données, APIs, server functions       |
| `src/store/`          | Gestion d’état globale                          |
| `src/types/`          | Types TypeScript globaux                        |
| `src/utils/`          | Fonctions utilitaires                           |
| `src/router.tsx`      | Config du router, typage global                 |
| `app.config.ts`       | Config globale du projet                        |
| `public/`             | Fichiers statiques                              |

Conseils pro :

- Ne surcharge pas /routes/ : déporte la logique métier dans /modules/ ou /services/.

- Garde les composants de page “fins” et déléguant la logique métier.

- Documente la structure dans le README pour l’onboarding.
