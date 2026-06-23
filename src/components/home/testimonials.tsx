"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Review } from "@prisma/client";
import { Reveal } from "@/components/shared/reveal";

export function Testimonials({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const count = reviews.length;

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate, count]);

  if (!count) return null;
  const review = reviews[index];

  return (
    <section
      id="temoignages"
      className="relative overflow-hidden section-padding bg-noir"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Quote className="h-[40rem] w-[40rem] text-gold/[0.03]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow">Témoignages</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-lg mt-6 text-ivory">
            La parole à nos hôtes
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="gold-divider my-10" />
        </Reveal>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={review.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? "fill-gold text-gold"
                        : "text-ivory/20"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-8 font-serif text-2xl font-light italic leading-relaxed text-ivory md:text-3xl">
                « {review.comment} »
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.3em] text-gold">
                {review.client}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={() => paginate(-1)}
              aria-label="Témoignage précédent"
              className="flex h-12 w-12 items-center justify-center border border-ivory/15 text-ivory-muted transition-all hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Témoignage ${i + 1}`}
                  className={`h-2 transition-all duration-300 ${
                    i === index ? "w-8 bg-gold" : "w-2 bg-ivory/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              aria-label="Témoignage suivant"
              className="flex h-12 w-12 items-center justify-center border border-ivory/15 text-ivory-muted transition-all hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
