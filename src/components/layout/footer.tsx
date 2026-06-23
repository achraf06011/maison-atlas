import Link from "next/link";
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail, Clock, Lock } from "lucide-react";
import { RESTAURANT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-noir-soft">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-ivory">{RESTAURANT.name}</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-gold">
              {RESTAURANT.tagline}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory-muted">
              {RESTAURANT.description}
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-ivory-muted">
              <li><Link href="/" className="transition-colors hover:text-gold">Accueil</Link></li>
              <li><Link href="/menu" className="transition-colors hover:text-gold">Menu</Link></li>
              <li><Link href="/galerie" className="transition-colors hover:text-gold">Galerie</Link></li>
              <li><Link href="/#reservation" className="transition-colors hover:text-gold">Réservation</Link></li>
              <li>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 text-gold transition-colors hover:text-gold-light"
                >
                  <Lock className="h-3.5 w-3.5" /> Connexion Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-ivory-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{RESTAURANT.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span>{RESTAURANT.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <span>{RESTAURANT.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{RESTAURANT.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-6">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href={RESTAURANT.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory-muted transition-all hover:border-gold hover:text-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={RESTAURANT.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory-muted transition-all hover:border-gold hover:text-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={RESTAURANT.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory-muted transition-all hover:border-gold hover:text-gold">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory-muted md:flex-row">
          <p>© {new Date().getFullYear()} {RESTAURANT.fullName}. Tous droits réservés.</p>
          <p className="uppercase tracking-widest">Une expérience gastronomique d&apos;exception</p>
        </div>
      </div>
    </footer>
  );
}
