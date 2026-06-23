import { prisma } from "@/lib/prisma";
import type {
  MenuItem,
  GalleryImage,
  Review,
  MenuCategory,
} from "@prisma/client";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * Fallback content shown when the database is not yet provisioned.
 * Keeps the portfolio site fully presentable out of the box.
 */
const FALLBACK_MENU = [
  {
    id: "f1",
    name: "Tartare de Saint-Jacques",
    description:
      "Noix de Saint-Jacques de plongée, caviar Oscietra, huile de yuzu et fleur de sel.",
    price: 38,
    image: img("1565299624946-b28f40a0ae38"),
    category: "ENTREE" as MenuCategory,
    allergens: ["Mollusques", "Poisson"],
    featured: true,
    available: true,
  },
  {
    id: "f2",
    name: "Filet de Boeuf Wagyu A5",
    description:
      "Wagyu japonais grade A5, pomme fondante, jus corsé au vin de Bourgogne.",
    price: 96,
    image: img("1546964124-0cce460f38ef"),
    category: "PLAT" as MenuCategory,
    allergens: ["Sulfites"],
    featured: true,
    available: true,
  },
  {
    id: "f3",
    name: "Homard Bleu de Bretagne",
    description:
      "Homard rôti au beurre noisette, bisque safranée et légumes glacés.",
    price: 78,
    image: img("1559847844-5315695dadae"),
    category: "PLAT" as MenuCategory,
    allergens: ["Crustacés", "Lait"],
    featured: true,
    available: true,
  },
  {
    id: "f4",
    name: "Soufflé au Grand Marnier",
    description:
      "Soufflé aérien au Grand Marnier, coeur coulant et glace vanille de Tahiti.",
    price: 24,
    image: img("1551024601-bec78aea704b"),
    category: "DESSERT" as MenuCategory,
    allergens: ["Oeufs", "Lait", "Gluten"],
    featured: true,
    available: true,
  },
] as unknown as MenuItem[];

const FALLBACK_GALLERY = [
  { id: "g1", image: img("1517248135467-4c7edcad34c4"), title: "La Grande Salle", category: "SALLE" },
  { id: "g2", image: img("1556910103-1c02745aae4d"), title: "Le Passe", category: "CUISINE" },
  { id: "g3", image: img("1424847651672-bf20a4b0982b"), title: "Terrasse", category: "TERRASSE" },
  { id: "g4", image: img("1546964124-0cce460f38ef"), title: "Wagyu A5", category: "PLATS" },
  { id: "g5", image: img("1559847844-5315695dadae"), title: "Homard Bleu", category: "PLATS" },
  { id: "g6", image: img("1530103862676-de8c9debad1d"), title: "Soirée Privée", category: "EVENEMENTS" },
] as unknown as GalleryImage[];

const FALLBACK_REVIEWS = [
  { id: "r1", client: "Isabelle Moreau", rating: 5, comment: "Une expérience absolument inoubliable. Chaque plat est une oeuvre d'art.", approved: true },
  { id: "r2", client: "James Whitmore", rating: 5, comment: "Worth every star. The finest Wagyu outside of Tokyo. A true temple of gastronomy.", approved: true },
  { id: "r3", client: "Sofia Marchetti", rating: 5, comment: "L'accord mets et vins est sublime. Une maison qui mérite sa réputation.", approved: true },
] as unknown as Review[];

export async function getFeaturedDishes(): Promise<MenuItem[]> {
  try {
    const items = await prisma.menuItem.findMany({
      where: { featured: true, available: true },
      take: 4,
      orderBy: { createdAt: "asc" },
    });
    return items.length ? items : FALLBACK_MENU;
  } catch {
    return FALLBACK_MENU;
  }
}

export async function getMenu(): Promise<MenuItem[]> {
  try {
    const items = await prisma.menuItem.findMany({
      where: { available: true },
      orderBy: { createdAt: "asc" },
    });
    return items.length ? items : FALLBACK_MENU;
  } catch {
    return FALLBACK_MENU;
  }
}

export async function getGallery(): Promise<GalleryImage[]> {
  try {
    const items = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return items.length ? items : FALLBACK_GALLERY;
  } catch {
    return FALLBACK_GALLERY;
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    const items = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    return items.length ? items : FALLBACK_REVIEWS;
  } catch {
    return FALLBACK_REVIEWS;
  }
}
