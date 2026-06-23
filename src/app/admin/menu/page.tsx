import { prisma } from "@/lib/prisma";
import { MenuManager } from "@/components/admin/menu-manager";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  let items: Awaited<ReturnType<typeof prisma.menuItem.findMany>> = [];
  try {
    items = await prisma.menuItem.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    items = [];
  }

  const data = items.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl text-ivory">Gestion du menu</h1>
        <p className="mt-2 text-ivory-muted">
          Ajoutez, modifiez ou retirez des plats de la carte.
        </p>
      </div>
      <MenuManager initial={data} />
    </div>
  );
}
