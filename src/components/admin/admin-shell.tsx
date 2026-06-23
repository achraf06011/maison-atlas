"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  Images,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RESTAURANT } from "@/lib/constants";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Réservations", icon: CalendarDays },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/gallery", label: "Galerie", icon: Images },
];

export function AdminShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="border-b border-ivory/10 p-6">
        <p className="font-serif text-2xl text-ivory">{RESTAURANT.name}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          Administration
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                active
                  ? "border-l-2 border-gold bg-gold/10 text-gold"
                  : "border-l-2 border-transparent text-ivory-muted hover:bg-ivory/5 hover:text-ivory"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-ivory/10 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-sm text-ivory-muted transition-colors hover:text-ivory"
        >
          <ExternalLink className="h-4 w-4" /> Voir le site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-ivory-muted transition-colors hover:text-red-400"
        >
          <LogOut className="h-4 w-4" /> Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-noir">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-ivory/10 bg-noir-soft lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-noir/80"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 border-r border-ivory/10 bg-noir-soft">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-5 text-ivory-muted"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ivory/10 bg-noir-soft px-6 py-4 lg:justify-end">
          <button
            className="text-ivory lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <p className="text-sm text-ivory-muted">
            Connecté · <span className="text-gold">{userName ?? "Admin"}</span>
          </p>
        </header>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
