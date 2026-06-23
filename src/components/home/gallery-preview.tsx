"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { GalleryImage } from "@prisma/client";
import { Reveal } from "@/components/shared/reveal";

export function GalleryPreview({ images }: { images: GalleryImage[] }) {
  // The image flagged "featured" headlines the large tile; otherwise the first.
  const featured = images.find((i) => i.featured);
  const ordered = featured
    ? [featured, ...images.filter((i) => i.id !== featured.id)]
    : images;
  const items = ordered.slice(0, 5);

  return (
    <section className="section-padding bg-noir-soft">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <Reveal>
              <p className="eyebrow">Galerie</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-lg mt-6 max-w-xl text-ivory">
                Un univers où chaque détail respire le raffinement
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/galerie"
              className="group flex items-center gap-3 text-sm uppercase tracking-widest text-gold"
            >
              Voir la galerie
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[260px] md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`group relative overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.title ?? "Maison Atlas"}
                fill
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-noir/30 transition-colors duration-500 group-hover:bg-noir/10" />
              {item.title && (
                <p className="absolute bottom-4 left-4 font-serif text-lg text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {item.title}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
