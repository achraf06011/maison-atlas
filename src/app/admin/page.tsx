import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Users,
  UtensilsCrossed,
  TrendingUp,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MAX_CAPACITY_PER_SLOT } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { RESERVATION_STATUS_LABELS } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const now = new Date();
    const [total, pending, confirmed, upcoming, menuCount, recent, featured] =
      await Promise.all([
        prisma.reservation.count(),
        prisma.reservation.count({ where: { status: "PENDING" } }),
        prisma.reservation.count({ where: { status: "CONFIRMED" } }),
        prisma.reservation.findMany({
          where: { date: { gte: now }, status: "CONFIRMED" },
        }),
        prisma.menuItem.count(),
        prisma.reservation.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.menuItem.findMany({
          where: { featured: true },
          take: 5,
          orderBy: { createdAt: "asc" },
        }),
      ]);

    const upcomingGuests = upcoming.reduce((sum, r) => sum + r.guests, 0);
    // Occupancy proxy: upcoming confirmed guests vs capacity over next 7 service days.
    const weekCapacity = MAX_CAPACITY_PER_SLOT * 7;
    const occupancy = Math.min(
      100,
      Math.round((upcomingGuests / weekCapacity) * 100)
    );

    return {
      total,
      pending,
      confirmed,
      menuCount,
      recent,
      featured,
      occupancy,
      upcomingGuests,
      ok: true,
    };
  } catch {
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      menuCount: 0,
      recent: [],
      featured: [],
      occupancy: 0,
      upcomingGuests: 0,
      ok: false,
    };
  }
}

const statusVariant: Record<string, "warning" | "success" | "danger" | "outline"> = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "outline",
  REFUSED: "danger",
};

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Réservations totales", value: stats.total, icon: CalendarDays },
    { label: "En attente", value: stats.pending, icon: Clock },
    { label: "Confirmées", value: stats.confirmed, icon: CheckCircle2 },
    { label: "Plats à la carte", value: stats.menuCount, icon: UtensilsCrossed },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-4xl text-ivory">Tableau de bord</h1>
        <p className="mt-2 text-ivory-muted">
          Vue d&apos;ensemble de l&apos;activité de Maison Atlas.
        </p>
      </div>

      {!stats.ok && (
        <div className="border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-300">
          La base de données n&apos;est pas encore connectée. Configurez
          <span className="font-medium"> DATABASE_URL</span> puis lancez
          <span className="font-medium"> npm run db:push</span> et
          <span className="font-medium"> npm run db:seed</span>.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="border border-ivory/10 bg-noir-soft p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-ivory-muted">
                {card.label}
              </p>
              <card.icon className="h-5 w-5 text-gold" />
            </div>
            <p className="mt-4 font-serif text-5xl text-ivory">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Occupancy */}
        <div className="border border-ivory/10 bg-noir-soft p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl text-ivory">Taux d&apos;occupation</h2>
          </div>
          <p className="mt-1 text-xs text-ivory-muted">
            Prévision sur 7 jours de service
          </p>
          <div className="mt-8 flex items-end gap-3">
            <span className="font-serif text-6xl text-gold">
              {stats.occupancy}
            </span>
            <span className="mb-2 text-2xl text-ivory-muted">%</span>
          </div>
          <div className="mt-4 h-2 w-full bg-noir-muted">
            <div
              className="h-full bg-gold transition-all"
              style={{ width: `${stats.occupancy}%` }}
            />
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-ivory-muted">
            <Users className="h-4 w-4 text-gold" />
            {stats.upcomingGuests} convives confirmés à venir
          </p>
        </div>

        {/* Popular / featured dishes */}
        <div className="border border-ivory/10 bg-noir-soft p-6">
          <h2 className="font-serif text-2xl text-ivory">Plats populaires</h2>
          <p className="mt-1 text-xs text-ivory-muted">Signatures mises en avant</p>
          <ul className="mt-6 space-y-3">
            {stats.featured.length === 0 && (
              <li className="text-sm text-ivory-muted">Aucun plat signature.</li>
            )}
            {stats.featured.map((dish, i) => (
              <li
                key={dish.id}
                className="flex items-center gap-3 border-b border-ivory/5 pb-3 text-sm"
              >
                <span className="font-serif text-lg text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ivory">{dish.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent reservations */}
        <div className="border border-ivory/10 bg-noir-soft p-6">
          <h2 className="font-serif text-2xl text-ivory">Dernières demandes</h2>
          <p className="mt-1 text-xs text-ivory-muted">Réservations récentes</p>
          <ul className="mt-6 space-y-4">
            {stats.recent.length === 0 && (
              <li className="text-sm text-ivory-muted">Aucune réservation.</li>
            )}
            {stats.recent.map((r) => (
              <li key={r.id} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ivory">{r.name}</span>
                  <Badge variant={statusVariant[r.status]}>
                    {RESERVATION_STATUS_LABELS[r.status]}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-ivory-muted">
                  {formatDate(r.date)} · {r.time} · {r.guests} couv.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
