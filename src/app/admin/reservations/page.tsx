import { prisma } from "@/lib/prisma";
import { ReservationsManager } from "@/components/admin/reservations-manager";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  let reservations: Awaited<ReturnType<typeof prisma.reservation.findMany>> = [];
  try {
    reservations = await prisma.reservation.findMany({
      orderBy: { date: "desc" },
    });
  } catch {
    reservations = [];
  }

  // Serialize dates for the client component.
  const data = reservations.map((r) => ({
    ...r,
    date: r.date.toISOString(),
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl text-ivory">Réservations</h1>
        <p className="mt-2 text-ivory-muted">
          Confirmez, refusez ou annulez les demandes de réservation.
        </p>
      </div>
      <ReservationsManager initial={data} />
    </div>
  );
}
