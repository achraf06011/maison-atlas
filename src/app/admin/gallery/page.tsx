import { prisma } from "@/lib/prisma";
import { GalleryManager } from "@/components/admin/gallery-manager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  let images: Awaited<ReturnType<typeof prisma.galleryImage.findMany>> = [];
  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    images = [];
  }

  const data = images.map((i) => ({
    id: i.id,
    image: i.image,
    title: i.title,
    category: i.category,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl text-ivory">Gestion de la galerie</h1>
        <p className="mt-2 text-ivory-muted">
          Ajoutez ou retirez des images de la galerie immersive.
        </p>
      </div>
      <GalleryManager initial={data} />
    </div>
  );
}
