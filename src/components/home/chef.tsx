"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { Parallax } from "@/components/shared/parallax";
import { Reveal } from "@/components/shared/reveal";
import { TextReveal } from "@/components/shared/text-reveal";

export function Chef() {
  return (
    <section className="relative overflow-hidden bg-noir-soft">
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 lg:grid-cols-2">
        <div className="relative min-h-[500px] overflow-hidden lg:min-h-[720px]">
          <Parallax offset={60} className="absolute inset-0 h-[120%]">
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
              alt="Le chef exécutif de Maison Atlas"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-noir/70 to-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 py-24 md:px-16">
          <Reveal>
            <p className="eyebrow">Le Chef Exécutif</p>
          </Reveal>
          <TextReveal
            as="h2"
            text="Antoine Lefèvre"
            className="heading-lg mt-6 text-ivory"
          />
          <Reveal delay={0.2}>
            <p className="mt-3 text-sm uppercase tracking-widest text-gold">
              Chef Étoilé · 25 ans de passion
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <Quote className="mt-10 h-10 w-10 text-gold/40" />
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-4 font-serif text-2xl font-light italic leading-relaxed text-ivory">
              « La cuisine est un langage. Chaque assiette raconte une histoire,
              celle d&apos;un terroir, d&apos;une saison, d&apos;un instant que
              l&apos;on souhaite rendre éternel. »
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <p className="mt-8 leading-relaxed text-ivory-muted">
              Formé auprès des plus grands, Antoine Lefèvre signe une cuisine
              instinctive et précise. Sa quête du produit parfait le mène des
              marchés de Rungis aux pêcheurs de Bretagne, à la recherche de
              l&apos;émotion juste.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
