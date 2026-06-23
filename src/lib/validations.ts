import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Le nom est requis").max(80),
  phone: z
    .string()
    .min(6, "Numéro de téléphone invalide")
    .max(25)
    .regex(/^[0-9+\s().-]+$/, "Numéro de téléphone invalide"),
  email: z.string().email("Adresse email invalide"),
  guests: z.coerce
    .number()
    .int()
    .min(1, "Au moins 1 convive")
    .max(20, "Maximum 20 convives — contactez-nous pour les grands groupes"),
  date: z.string().min(1, "La date est requise"),
  time: z.string().min(1, "L'heure est requise"),
  message: z.string().max(500).optional().or(z.literal("")),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const menuItemSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(5).max(500),
  price: z.coerce.number().min(0),
  image: z.string().url("URL d'image invalide"),
  category: z.enum(["ENTREE", "PLAT", "DESSERT", "BOISSON", "DEGUSTATION"]),
  allergens: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  available: z.boolean().default(true),
});

export type MenuItemInput = z.infer<typeof menuItemSchema>;

export const galleryImageSchema = z.object({
  image: z.string().url("URL d'image invalide"),
  title: z.string().max(120).optional().or(z.literal("")),
  category: z.enum(["SALLE", "TERRASSE", "CUISINE", "EVENEMENTS", "PLATS"]),
});

export type GalleryImageInput = z.infer<typeof galleryImageSchema>;

export const reviewSchema = z.object({
  client: z.string().min(2).max(80),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(5).max(500),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});
