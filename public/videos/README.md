# Vidéos d'arrière-plan

Déposez ici les fichiers vidéo utilisés par le site. Le composant Hero
référence `/videos/hero.mp4`.

Fichiers attendus :

- `hero.mp4` — vidéo plein écran de la section Hero (idéalement 1920x1080, < 6 Mo, muette)

Tant qu'aucune vidéo n'est présente, le Hero affiche automatiquement une
image de remplacement (`poster`) — le site reste donc pleinement fonctionnel.

## Sources gratuites de vidéos premium

- Pexels Videos — https://www.pexels.com/videos/
- Coverr — https://coverr.co/
- Mixkit — https://mixkit.co/free-stock-video/

## Optimisation

- Compressez en H.264, supprimez la piste audio (le Hero est muet).
- Visez moins de 6 Mo pour un chargement rapide.
- L'attribut `playsInline` + `muted` + `loop` assure l'autoplay sur mobile.
