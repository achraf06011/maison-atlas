"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { loginSchema } from "@/lib/validations";
import { RESTAURANT } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginInput = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setAuthError(null);
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.error) {
      setAuthError("Identifiants incorrects.");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-noir px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md border border-ivory/10 bg-noir-soft p-10"
      >
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ivory-muted transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Retour au site
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-gold/40">
            <Lock className="h-6 w-6 text-gold" />
          </div>
          <h1 className="font-serif text-3xl text-ivory">{RESTAURANT.name}</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold">
            Espace Administrateur
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="admin@maisonatlas.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Mot de passe</Label>
            <Input type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {authError && (
            <p className="border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {authError}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
