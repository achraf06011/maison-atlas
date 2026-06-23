"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MenuItem } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function DishCard({ dish, index = 0 }: { dish: MenuItem; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col border border-ivory/10 bg-noir-soft transition-colors duration-500 hover:border-gold/50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
        {dish.featured && (
          <div className="absolute left-4 top-4">
            <Badge variant="solid">Signature</Badge>
          </div>
        )}
        <div className="absolute bottom-4 right-4 border border-gold/50 bg-noir/70 px-3 py-1 font-serif text-lg text-gold backdrop-blur-sm">
          {formatPrice(dish.price)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl text-ivory transition-colors group-hover:text-gold">
          {dish.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-muted">
          {dish.description}
        </p>
        {dish.allergens.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-ivory/10 pt-4">
            {dish.allergens.map((a) => (
              <Badge key={a} variant="outline">
                {a}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
