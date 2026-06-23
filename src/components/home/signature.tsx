import Link from "next/link";
import type { MenuItem } from "@prisma/client";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { DishCard } from "@/components/menu/dish-card";

export function Signature({ dishes }: { dishes: MenuItem[] }) {
  return (
    <section id="signature" className="section-padding bg-noir">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Signature Culinaire</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg mt-6 text-ivory">
              Les créations qui nous définissent
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="gold-divider my-8" />
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg font-light leading-relaxed text-ivory-muted">
              Une sélection de plats emblématiques, pensés comme autant de
              déclarations de notre vision de la haute cuisine.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/menu">Explorer la carte complète</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
