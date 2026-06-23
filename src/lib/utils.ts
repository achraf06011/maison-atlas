import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export const MENU_CATEGORY_LABELS: Record<string, string> = {
  ENTREE: "Entrées",
  PLAT: "Plats",
  DESSERT: "Desserts",
  BOISSON: "Boissons",
  DEGUSTATION: "Menus Dégustation",
};

export const GALLERY_CATEGORY_LABELS: Record<string, string> = {
  SALLE: "Salle",
  TERRASSE: "Terrasse",
  CUISINE: "Cuisine",
  EVENEMENTS: "Événements",
  PLATS: "Plats",
};

export const RESERVATION_STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  CANCELLED: "Annulée",
  REFUSED: "Refusée",
};
