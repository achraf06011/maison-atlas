# Guide de déploiement — Maison Atlas Premium

Ce guide couvre le déploiement gratuit sur **Vercel** et **Netlify**, avec une
base de données **Supabase PostgreSQL** (offre gratuite durable).

---

## 1. Préparer la base de données Supabase

1. Créez un compte sur [supabase.com](https://supabase.com) et un nouveau projet.
2. Notez le mot de passe de la base défini à la création.
3. **Project Settings → Database → Connection string** :
   - `DATABASE_URL` = chaîne **Transaction pooler** (port `6543`), suffixée de `?pgbouncer=true`
   - `DIRECT_URL` = chaîne **Direct connection** (port `5432`)
4. Depuis votre machine, poussez le schéma et les données :

```bash
npm run db:push
npm run db:seed
```

> Alternative gratuite : [Neon](https://neon.tech) — utilisez la même chaîne
> pour `DATABASE_URL` et `DIRECT_URL` (Neon gère le pooling séparément).

---

## 2. Variables d'environnement (production)

À renseigner dans le tableau de bord de l'hébergeur :

| Variable | Exemple |
| --- | --- |
| `DATABASE_URL` | `postgresql://...:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | `postgresql://...:5432/postgres` |
| `NEXTAUTH_SECRET` | (généré avec `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `https://votre-domaine.vercel.app` |
| `ADMIN_EMAIL` | `admin@maisonatlas.com` |
| `ADMIN_PASSWORD` | (mot de passe fort) |
| `ADMIN_NAME` | `Maison Atlas Admin` |
| `NEXT_PUBLIC_SITE_URL` | `https://votre-domaine.vercel.app` |

> ⚠️ `NEXTAUTH_URL` et `NEXT_PUBLIC_SITE_URL` doivent correspondre à l'URL
> finale de production.

---

## 3. Déploiement sur Vercel (recommandé)

1. Poussez le projet sur GitHub / GitLab / Bitbucket.
2. Sur [vercel.com](https://vercel.com), **Add New → Project** et importez le dépôt.
3. Vercel détecte Next.js automatiquement. Laissez les réglages par défaut
   (Build : `npm run build`, qui exécute `prisma generate`).
4. Ajoutez toutes les variables d'environnement ci-dessus.
5. **Deploy**.
6. Une fois en ligne, mettez `NEXTAUTH_URL` et `NEXT_PUBLIC_SITE_URL` à jour
   avec l'URL réelle, puis redéployez.

### Initialiser la base depuis l'environnement de prod

Le `db:push` / `db:seed` se lance depuis votre machine (avec les variables de
prod dans `.env`) ou via la CLI Supabase. Faites-le une fois après le premier
déploiement.

---

## 4. Déploiement sur Netlify

1. Poussez le projet sur un dépôt Git.
2. Sur [netlify.com](https://netlify.com), **Add new site → Import an existing project**.
3. Réglages de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
4. Installez le plugin officiel **`@netlify/plugin-nextjs`** (Netlify le propose
   automatiquement pour les projets Next.js). Un `netlify.toml` est fourni :

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

5. Ajoutez les variables d'environnement (section 2).
6. **Deploy site**, puis mettez `NEXTAUTH_URL` / `NEXT_PUBLIC_SITE_URL` à jour.

---

## 5. Vérifications post-déploiement

- [ ] Page d'accueil, menu et galerie se chargent et animent correctement.
- [ ] Une réservation de test s'enregistre (vérifier dans le dashboard / Supabase).
- [ ] Connexion admin fonctionnelle sur `/admin/login`.
- [ ] `/sitemap.xml` et `/robots.txt` répondent.
- [ ] Lighthouse > 90 (Performance / SEO / Best Practices).

---

## 6. Conseils performance (Lighthouse > 90)

- Le Hero utilise une vidéo `muted/loop/playsInline` avec image `poster` de repli.
- Compressez la vidéo (< 6 Mo, H.264, sans audio).
- Les images distantes passent par `next/image` (formats AVIF/WebP).
- Les animations respectent `prefers-reduced-motion`.

---

## Dépannage

| Problème | Solution |
| --- | --- |
| `Can't reach database` | Vérifiez `DATABASE_URL` / `DIRECT_URL` et que le projet Supabase est actif. |
| Erreur Prisma au build | `npm run build` exécute `prisma generate` ; vérifiez les variables. |
| Connexion admin échoue | Lancez `npm run db:seed` avec les bonnes variables ; vérifiez `NEXTAUTH_SECRET`. |
| Redirection login en boucle | Assurez-vous que `NEXTAUTH_URL` correspond exactement à l'URL de prod. |
