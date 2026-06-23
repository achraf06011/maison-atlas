import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { RESTAURANT } from "@/lib/constants";
import { ReservationForm } from "@/components/reservation/reservation-form";

export function ReservationSection() {
  return (
    <section id="reservation" className="relative overflow-hidden bg-noir-soft">
      <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
        <div className="relative hidden min-h-full lg:block">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
            alt="L'ambiance feutrée de Maison Atlas"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-noir/40 to-noir-soft" />
          <div className="absolute bottom-0 left-0 w-full p-12">
            <div className="space-y-5 border-t border-gold/30 pt-8">
              <div className="flex items-center gap-4 text-ivory">
                <MapPin className="h-5 w-5 text-gold" />
                <span>{RESTAURANT.address}</span>
              </div>
              <div className="flex items-center gap-4 text-ivory">
                <Phone className="h-5 w-5 text-gold" />
                <span>{RESTAURANT.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-ivory">
                <Clock className="h-5 w-5 text-gold" />
                <span>{RESTAURANT.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-24 md:px-16">
          <Reveal>
            <p className="eyebrow">Réservation</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg mt-6 text-ivory">Réservez votre table</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 leading-relaxed text-ivory-muted">
              Offrez-vous un moment d&apos;exception. Nous vérifions la
              disponibilité en temps réel et confirmons chaque réservation
              personnellement.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10">
              <ReservationForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
