import { PrismaClient, MenuCategory, GalleryCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

async function main() {
  console.log("Seeding Maison Atlas Premium...");

  // ----- Admin user -----
  const email = process.env.ADMIN_EMAIL ?? "admin@maisonatlas.com";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe!2026";
  const name = process.env.ADMIN_NAME ?? "Maison Atlas Admin";
  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { name, password: hashed },
    create: { email, name, password: hashed, role: "ADMIN" },
  });
  console.log(`Admin ready: ${email}`);

  // ----- Menu -----
  await prisma.menuItem.deleteMany();
  await prisma.menuItem.createMany({
    data: [
      {
        name: "Tartare de Saint-Jacques",
        description:
          "Noix de Saint-Jacques de plongée, caviar Oscietra, huile de yuzu et fleur de sel de Camargue.",
        price: 38,
        image: img("1565299624946-b28f40a0ae38"),
        category: MenuCategory.ENTREE,
        allergens: ["Mollusques", "Poisson"],
        featured: true,
      },
      {
        name: "Velouté de Cèpes",
        description:
          "Cèpes de saison, mousse de truffe noire du Périgord et éclats de noisette torréfiée.",
        price: 29,
        image: img("1547592180-85f173990554"),
        category: MenuCategory.ENTREE,
        allergens: ["Lait", "Fruits à coque"],
      },
      {
        name: "Foie Gras de Canard Poêlé",
        description:
          "Foie gras des Landes, chutney de figue, brioche maison et réduction de Porto vintage.",
        price: 42,
        image: img("1432139555190-58524dae6a55"),
        category: MenuCategory.ENTREE,
        allergens: ["Gluten", "Oeufs"],
        featured: true,
      },
      {
        name: "Filet de Boeuf Wagyu A5",
        description:
          "Wagyu japonais grade A5, pomme fondante, jus corsé au vin de Bourgogne et moelle rôtie.",
        price: 96,
        image: img("1546964124-0cce460f38ef"),
        category: MenuCategory.PLAT,
        allergens: ["Sulfites"],
        featured: true,
      },
      {
        name: "Homard Bleu de Bretagne",
        description:
          "Homard rôti au beurre noisette, bisque safranée et légumes glacés du potager.",
        price: 78,
        image: img("1559847844-5315695dadae"),
        category: MenuCategory.PLAT,
        allergens: ["Crustacés", "Lait"],
        featured: true,
      },
      {
        name: "Turbot de Ligne",
        description:
          "Turbot sauvage, beurre blanc au champagne, asperges vertes et caviar impérial.",
        price: 68,
        image: img("1485921325833-c519f76c4927"),
        category: MenuCategory.PLAT,
        allergens: ["Poisson", "Lait", "Sulfites"],
      },
      {
        name: "Soufflé au Grand Marnier",
        description:
          "Soufflé aérien au Grand Marnier, coeur coulant et glace vanille de Tahiti minute.",
        price: 24,
        image: img("1551024601-bec78aea704b"),
        category: MenuCategory.DESSERT,
        allergens: ["Oeufs", "Lait", "Gluten"],
        featured: true,
      },
      {
        name: "Sphère Chocolat Grand Cru",
        description:
          "Chocolat Valrhona 70%, ganache pralinée et or comestible 24 carats.",
        price: 26,
        image: img("1606313564200-e75d5e30476c"),
        category: MenuCategory.DESSERT,
        allergens: ["Lait", "Fruits à coque", "Soja"],
      },
      {
        name: "Pavlova Fruits de la Passion",
        description:
          "Meringue croustillante, crème légère et fruits exotiques marinés au rhum ambré.",
        price: 22,
        image: img("1488477181946-6428a0291777"),
        category: MenuCategory.DESSERT,
        allergens: ["Oeufs", "Lait"],
      },
      {
        name: "Champagne Dom Pérignon 2013",
        description:
          "Vintage prestige, notes d'agrumes confits et brioche, servi à la coupe.",
        price: 45,
        image: img("1510812431401-41d2bd2722f3"),
        category: MenuCategory.BOISSON,
        allergens: ["Sulfites"],
      },
      {
        name: "Accord Mets et Vins",
        description:
          "Sélection de cinq verres signés par notre chef sommelier pour accompagner le menu.",
        price: 120,
        image: img("1414235077428-338989a2e8c0"),
        category: MenuCategory.BOISSON,
        allergens: ["Sulfites"],
        featured: true,
      },
      {
        name: "Mocktail Atlas",
        description:
          "Création sans alcool : verveine, yuzu, gingembre et fleur d'oranger.",
        price: 16,
        image: img("1536935338788-846bb9981813"),
        category: MenuCategory.BOISSON,
        allergens: [],
      },
      {
        name: "Menu Découverte — 5 Services",
        description:
          "Un parcours en cinq temps imaginé chaque jour par le Chef selon le marché.",
        price: 165,
        image: img("1414235077428-338989a2e8c0"),
        category: MenuCategory.DEGUSTATION,
        allergens: ["Variable"],
        featured: true,
      },
      {
        name: "Menu Signature — 8 Services",
        description:
          "L'expérience complète : huit créations d'exception et leurs accords millésimés.",
        price: 240,
        image: img("1559339352-11d035aa65de"),
        category: MenuCategory.DEGUSTATION,
        allergens: ["Variable"],
        featured: true,
      },
    ],
  });
  console.log("Menu seeded.");

  // ----- Gallery -----
  await prisma.galleryImage.deleteMany();
  await prisma.galleryImage.createMany({
    data: [
      { image: img("1517248135467-4c7edcad34c4"), title: "La Grande Salle", category: GalleryCategory.SALLE },
      { image: img("1559339352-11d035aa65de"), title: "Table d'Hôte", category: GalleryCategory.SALLE },
      { image: img("1424847651672-bf20a4b0982b"), title: "Terrasse au Crépuscule", category: GalleryCategory.TERRASSE },
      { image: img("1552566626-52f8b828add9"), title: "Jardin Privé", category: GalleryCategory.TERRASSE },
      { image: img("1556910103-1c02745aae4d"), title: "Le Passe", category: GalleryCategory.CUISINE },
      { image: img("1577219491135-ce391730fb2c"), title: "Brigade en Action", category: GalleryCategory.CUISINE },
      { image: img("1530103862676-de8c9debad1d"), title: "Soirée Privée", category: GalleryCategory.EVENEMENTS },
      { image: img("1519671482749-fd09be7ccebf"), title: "Réception Gastronomique", category: GalleryCategory.EVENEMENTS },
      { image: img("1565299624946-b28f40a0ae38"), title: "Saint-Jacques", category: GalleryCategory.PLATS },
      { image: img("1546964124-0cce460f38ef"), title: "Wagyu A5", category: GalleryCategory.PLATS },
      { image: img("1559847844-5315695dadae"), title: "Homard Bleu", category: GalleryCategory.PLATS },
      { image: img("1551024601-bec78aea704b"), title: "Soufflé", category: GalleryCategory.PLATS },
    ],
  });
  console.log("Gallery seeded.");

  // ----- Reviews -----
  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: [
      {
        client: "Isabelle Moreau",
        rating: 5,
        comment:
          "Une expérience absolument inoubliable. Chaque plat est une oeuvre d'art et le service frôle la perfection.",
      },
      {
        client: "James Whitmore",
        rating: 5,
        comment:
          "Worth every star. The Wagyu was the finest I have tasted outside of Tokyo. A true temple of gastronomy.",
      },
      {
        client: "Sofia Marchetti",
        rating: 5,
        comment:
          "L'accord mets et vins est sublime. Une maison qui mérite amplement sa réputation d'excellence.",
      },
      {
        client: "Thomas Bernard",
        rating: 4,
        comment:
          "Cadre somptueux et cuisine raffinée. Le soufflé au Grand Marnier restera gravé dans ma mémoire.",
      },
      {
        client: "Amélie Dubois",
        rating: 5,
        comment:
          "Du premier au dernier service, une chorégraphie parfaite. Maison Atlas redéfinit la haute cuisine.",
      },
    ],
  });
  console.log("Reviews seeded.");

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
