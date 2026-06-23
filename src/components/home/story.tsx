"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/use-gsap";
import { Reveal } from "@/components/shared/reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Story() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        // Image reveal with a scaling clip
        gsap.fromTo(
          ".story-image",
          { clipPath: "inset(100% 0 0 0)", scale: 1.2 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: ".story-image", start: "top 80%" },
          }
        );

        // Subtle parallax on the floating year badge
        gsap.to(".story-badge", {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="histoire" ref={root} className="section-padding bg-noir">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="story-image relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80"
              alt="L'intérieur élégant de Maison Atlas"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="story-badge absolute -right-4 -top-8 hidden border border-gold/40 bg-noir px-8 py-6 text-center md:block">
            <p className="font-serif text-5xl text-gold">2009</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ivory-muted">
              Depuis
            </p>
          </div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Notre Histoire</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg mt-6 text-ivory">
              L&apos;art de recevoir, élevé au rang d&apos;expérience
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="gold-divider my-8 ml-0 mr-auto w-24" />
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg font-light leading-relaxed text-ivory-muted">
              Née d&apos;une passion absolue pour le produit, Maison Atlas cultive
              depuis 2009 une vision singulière de la gastronomie : celle où chaque
              détail compte, du premier regard à la dernière bouchée.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-6 leading-relaxed text-ivory-muted">
              Dans un écrin intemporel mêlant noir profond et or, notre maison
              orchestre une rencontre entre tradition française et inspirations du
              monde. Une cuisine d&apos;émotion, servie avec la précision d&apos;un
              établissement étoilé.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-ivory/10 pt-8">
              {[
                { value: "15", label: "Années d'excellence" },
                { value: "3", label: "Distinctions" },
                { value: "40", label: "Couverts par service" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl text-gold">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-ivory-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
