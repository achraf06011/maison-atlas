# Maison Atlas Premium

Site web d'un restaurant gastronomique haut de gamme — une expérience immersive,
cinématique et entièrement responsive, pensée comme projet portfolio premium.

![Maison Atlas Premium](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80)

## Stack technique

| Domaine | Technologie |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript |
| Styles | Tailwind CSS + design system « noir / ivoire / or » |
| UI | Shadcn/UI (Radix) |
| Animations | Framer Motion + GSAP (ScrollTrigger) |
| Icônes | Lucide React |
| Base de données | Supabase PostgreSQL |
| ORM | Prisma |
| Formulaires | React Hook Form + Zod |
| Authentification | NextAuth (Credentials, JWT) |

100 % déployable gratuitement sur **Vercel** ou **Netlify** avec une base
Supabase / Neon gratuite et durable.

## Fonctionnalités

- **Accueil immersif** : Hero vidéo plein écran, parallaxe, text reveal, écran de chargement cinématique (GSAP), sections Histoire / Chef / Signature / Galerie / Témoignages / Réservation.
- **Menu interactif** : filtres animés par catégorie, recherche instantanée, cartes premium avec zoom au survol, allergènes et prix.
- **Réservation en ligne** : formulaire validé (Zod), vérification automatique de disponibilité et des places restantes, confirmation animée.
- **Galerie immersive** : layout masonry, lightbox clavier-navigable, filtres par catégorie, effets cinématiques.
- **Dashboard administrateur** sécurisé : statistiques (réservations, plats populaires, taux d'occupation), gestion des réservations (confirmer / refuser / annuler / supprimer), CRUD du menu et de la galerie.
- **Témoignages** : carrousel automatique avec notes sur 5.
- **SEO** : métadonnées dynamiques, Open Graph (image générée), sitemap, robots, Lighthouse-friendly.

## Démarrage rapide

### 1. Prérequis

- Node.js 18.18+ (recommandé : 20+)
- Un compte [Supabase](https://supabase.com) gratuit (ou [Neon](https://neon.tech))

### 2. Installation

```bash
npm install
```

### 3. Configurer la base de données Supabase

1. Créez un projet sur [supabase.com](https://supabase.com).
2. Allez dans **Project Settings → Database → Connection string**.
3. Copiez les deux chaînes de connexion :
   - **Transaction pooler** (port `6543`) → `DATABASE_URL`
   - **Direct connection** (port `5432`) → `DIRECT_URL`

### 4. Variables d'environnement

```bash
cp .env.example .env
```

Remplissez `.env` :

```env
DATABASE_URL="postgresql://...:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://...:5432/postgres"
NEXTAUTH_SECRET="<openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@maisonatlas.com"
ADMIN_PASSWORD="ChangeMe!2026"
ADMIN_NAME="Maison Atlas Admin"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Générer un secret NextAuth :

```bash
openssl rand -base64 32
```

### 5. Créer le schéma et les données de démonstration

```bash
npm run db:push    # crée les tables dans Supabase
npm run db:seed    # ajoute le compte admin + menu + galerie + avis
```

### 6. Lancer le site

```bash
npm run dev
```

- Site : http://localhost:3000
- Admin : http://localhost:3000/admin/login
  (identifiants = `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (génère le client Prisma) |
| `npm run start` | Serveur de production |
| `npm run db:push` | Synchronise le schéma Prisma avec Supabase |
| `npm run db:seed` | Insère les données de démonstration |
| `npm run db:studio` | Ouvre Prisma Studio |
| `npm run lint` | Linting |

## Vidéos d'arrière-plan

Déposez vos vidéos dans `public/videos/` (voir `public/videos/README.md`).
Sans vidéo, le Hero affiche une image de remplacement — le site reste fonctionnel.

## Structure du projet

```
src/
├── app/
│   ├── (site)/          # Pages publiques (accueil, menu, galerie) + layout
│   ├── admin/           # Dashboard + login (protégé par middleware)
│   ├── api/             # Routes API (reservations, menu, gallery, reviews, auth)
│   ├── layout.tsx       # Layout racine (fonts, providers, SEO)
│   ├── sitemap.ts / robots.ts / opengraph-image.tsx
├── components/
│   ├── home/            # Sections de la page d'accueil
│   ├── menu/ gallery/   # Composants spécifiques
│   ├── reservation/     # Formulaire de réservation
│   ├── admin/           # Composants du dashboard
│   ├── shared/          # Animations (Reveal, TextReveal, Parallax, LoadingScreen)
│   ├── providers/       # Session + Toast
│   └── ui/              # Primitives Shadcn
├── lib/                 # prisma, auth, data, validations, utils, constants
├── hooks/               # useGSAP
└── types/               # next-auth.d.ts
prisma/
├── schema.prisma
└── seed.ts
```

## Déploiement

Voir **[DEPLOYMENT.md](./DEPLOYMENT.md)** pour le guide complet Vercel & Netlify.

## Licence

Projet de démonstration / portfolio. Images de démonstration via Unsplash.
