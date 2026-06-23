"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryImage, GalleryCategory } from "@prisma/client";
import { GALLERY_CATEGORY_LABELS } from "@/lib/utils";

const CATEGORIES: (GalleryCategory | "ALL")[] = [
  "ALL",
  "SALLE",
  "TERRASSE",
  "CUISINE",
  "EVENEMENTS",
  "PLATS",
];

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryCategory | "ALL">("ALL");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      active === "ALL"
        ? images
        : images.filter((i) => i.category === active),
    [images, active]
  );

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () =>
      setLightbox((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? null : (i - 1 + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, next, prev]);

  return (
    <section className="section-padding bg-noir">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => {
            const label = cat === "ALL" ? "Tout" : GALLERY_CATEGORY_LABELS[cat];
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="relative px-5 py-2 text-xs font-medium uppercase tracking-widest transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-pill"
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

        {/* Masonry layout via CSS columns */}
        <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                onClick={() => setLightbox(i)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title ?? "Maison Atlas"}
                  width={600}
                  height={i % 3 === 0 ? 800 : 600}
                  className="h-auto w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-noir/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <ZoomIn className="h-8 w-8 text-gold" />
                  {item.title && (
                    <p className="mt-3 font-serif text-xl text-ivory">
                      {item.title}
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-noir/95 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Fermer"
              className="absolute right-6 top-6 z-10 text-ivory transition-colors hover:text-gold"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Précédent"
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center text-ivory transition-colors hover:text-gold md:left-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Suivant"
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center text-ivory transition-colors hover:text-gold md:right-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <motion.div
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[85vh] w-full max-w-5xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mx-auto aspect-[3/2] w-full">
                <Image
                  src={filtered[lightbox].image}
                  alt={filtered[lightbox].title ?? "Maison Atlas"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              {filtered[lightbox].title && (
                <p className="mt-6 text-center font-serif text-2xl text-ivory">
                  {filtered[lightbox].title}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
