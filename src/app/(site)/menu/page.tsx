import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { getMenu } from "@/lib/data";

export const metadata: Metadata = {
  title: "Le Menu",
  description:
    "Découvrez la carte de Maison Atlas Premium : entrées, plats, desserts, boissons et menus dégustation signés par notre chef étoilé.",
};

export const revalidate = 60;

export default async function MenuPage() {
  const items = await getMenu();

  return (
    <>
      <PageHeader
        eyebrow="La Carte"
        title="Une partition gastronomique"
        description="Des produits d'exception, une exécution précise. Chaque création est pensée pour l'émotion."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
      />
      <MenuExplorer items={items} />
    </>
  );
}
