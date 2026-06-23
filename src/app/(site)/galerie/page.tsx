import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Plongez dans l'univers de Maison Atlas Premium : la salle, la terrasse, la cuisine, nos événements et nos créations culinaires.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="L'univers Maison Atlas"
        description="Une immersion visuelle dans nos espaces, notre cuisine et nos instants d'exception."
        image="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1920&q=80"
      />
      <GalleryGrid images={images} />
    </>
  );
}
