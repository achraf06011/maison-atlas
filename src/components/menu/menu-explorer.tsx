"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, UtensilsCrossed } from "lucide-react";
import type { MenuItem, MenuCategory } from "@prisma/client";
import { MENU_CATEGORY_LABELS } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { DishCard } from "@/components/menu/dish-card";

const CATEGORIES: (MenuCategory | "ALL")[] = [
  "ALL",
  "ENTREE",
  "PLAT",
  "DESSERT",
  "BOISSON",
  "DEGUSTATION",
];

export function MenuExplorer({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<MenuCategory | "ALL">("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchCat = active === "ALL" || item.category === active;
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [items, active, query]);

  return (
    <section className="section-padding bg-noir">
      <div className="mx-auto max-w-7xl">
        {/* Search */}
        <div className="mx-auto mb-10 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un plat..."
              className="pl-11"
            />
          </div>
        </div>

        {/* Animated filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => {
            const label =
              cat === "ALL" ? "Tout" : MENU_CATEGORY_LABELS[cat];
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="relative px-5 py-2 text-xs font-medium uppercase tracking-widest transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 border border-gold bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive ? "text-noir" : "text-ivory-muted hover:text-ivory"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-14 min-h-[300px]">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <UtensilsCrossed className="h-10 w-10 text-gold/40" />
              <p className="mt-4 text-ivory-muted">
                Aucun plat ne correspond à votre recherche.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((dish, i) => (
                  <motion.div key={dish.id} layout exit={{ opacity: 0, scale: 0.9 }}>
                    <DishCard dish={dish} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
