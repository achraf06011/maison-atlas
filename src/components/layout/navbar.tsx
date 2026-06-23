"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RESTAURANT } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/galerie", label: "Galerie" },
  { href: "/#histoire", label: "Histoire" },
  { href: "/#temoignages", label: "Témoignages" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-ivory/10 bg-noir/85 py-4 backdrop-blur-xl"
          : "py-6"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-serif text-xl tracking-wide text-ivory transition-colors group-hover:text-gold md:text-2xl">
            {RESTAURANT.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold">
            {RESTAURANT.tagline}
          </span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-xs font-medium uppercase tracking-widest text-ivory-muted transition-colors hover:text-ivory"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild size="sm" variant="outline">
            <Link href="/#reservation">Réserver</Link>
          </Button>
        </div>

        <button
          className="text-ivory lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-noir px-6 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl text-ivory">
                {RESTAURANT.name}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="text-ivory"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="font-serif text-3xl text-ivory transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button asChild size="lg" className="w-full">
                <Link href="/#reservation">Réserver une table</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
