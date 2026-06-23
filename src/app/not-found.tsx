import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-noir px-6 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="mt-6 font-serif text-6xl text-ivory md:text-8xl">
        Page introuvable
      </h1>
      <div className="gold-divider my-8" />
      <p className="max-w-md text-ivory-muted">
        La page que vous recherchez semble s&apos;être évaporée comme un soufflé
        sorti trop tôt du four.
      </p>
      <Button asChild size="lg" className="mt-10">
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
