"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Ban,
  Trash2,
  Mail,
  Phone,
  Users,
  Filter,
} from "lucide-react";
import { formatDate, RESERVATION_STATUS_LABELS } from "@/lib/utils";
import { useToast } from "@/components/providers/toast-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReservationRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  message: string | null;
  status: string;
}

const FILTERS = ["ALL", "PENDING", "CONFIRMED", "CANCELLED", "REFUSED"] as const;

const statusVariant: Record<string, "warning" | "success" | "danger" | "outline"> =
  {
    PENDING: "warning",
    CONFIRMED: "success",
    CANCELLED: "outline",
    REFUSED: "danger",
  };

export function ReservationsManager({
  initial,
}: {
  initial: ReservationRow[];
}) {
  const { toast } = useToast();
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const [busy, setBusy] = useState<string | null>(null);

  const visible =
    filter === "ALL" ? rows : rows.filter((r) => r.status === filter);

  const updateStatus = async (id: string, status: string) => {
    setBusy(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      toast({ variant: "success", title: "Statut mis à jour" });
    } catch {
      toast({ variant: "error", title: "Échec de la mise à jour" });
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string) => {
    setBusy(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast({ variant: "success", title: "Réservation supprimée" });
    } catch {
      toast({ variant: "error", title: "Échec de la suppression" });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Filter className="mr-1 h-4 w-4 text-gold" />
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-colors ${
              filter === f
                ? "bg-gold text-noir"
                : "border border-ivory/15 text-ivory-muted hover:text-ivory"
            }`}
          >
            {f === "ALL" ? "Toutes" : RESERVATION_STATUS_LABELS[f]}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="border border-ivory/10 bg-noir-soft p-16 text-center text-ivory-muted">
          Aucune réservation dans cette catégorie.
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {visible.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="border border-ivory/10 bg-noir-soft p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-2xl text-ivory">
                        {r.name}
                      </h3>
                      <Badge variant={statusVariant[r.status]}>
                        {RESERVATION_STATUS_LABELS[r.status]}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory-muted">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gold" />
                        {r.guests} couverts
                      </span>
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gold" />
                        {r.email}
                      </span>
                      <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gold" />
                        {r.phone}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gold">
                      {formatDate(r.date)} · {r.time}
                    </p>
                    {r.message && (
                      <p className="mt-3 border-l-2 border-gold/40 pl-3 text-sm italic text-ivory-muted">
                        {r.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busy === r.id || r.status === "CONFIRMED"}
                      onClick={() => updateStatus(r.id, "CONFIRMED")}
                    >
                      <Check className="h-4 w-4" /> Confirmer
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={busy === r.id || r.status === "REFUSED"}
                      onClick={() => updateStatus(r.id, "REFUSED")}
                    >
                      <X className="h-4 w-4" /> Refuser
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={busy === r.id || r.status === "CANCELLED"}
                      onClick={() => updateStatus(r.id, "CANCELLED")}
                    >
                      <Ban className="h-4 w-4" /> Annuler
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={busy === r.id}
                      onClick={() => remove(r.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
