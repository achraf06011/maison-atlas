// Restaurant-wide configuration constants.

export const RESTAURANT = {
  name: "Maison Atlas",
  tagline: "Premium",
  fullName: "Maison Atlas Premium",
  description:
    "Une expérience gastronomique d'exception au coeur de la haute cuisine française et internationale.",
  phone: "+33 1 42 00 00 00",
  email: "reservation@maisonatlas.com",
  address: "12 Rue des Étoiles, 75008 Paris",
  hours: "Mardi — Dimanche · 19h00 — 23h00",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
} as const;

// Maximum covers the dining room can host for a single time slot.
export const MAX_CAPACITY_PER_SLOT = 40;

export const TIME_SLOTS = [
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
] as const;

export const ALLERGEN_OPTIONS = [
  "Gluten",
  "Crustacés",
  "Oeufs",
  "Poisson",
  "Arachides",
  "Soja",
  "Lait",
  "Fruits à coque",
  "Céleri",
  "Moutarde",
  "Sésame",
  "Sulfites",
  "Mollusques",
] as const;
