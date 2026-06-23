"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, CalendarCheck } from "lucide-react";
import { reservationSchema, type ReservationInput } from "@/lib/validations";
import { TIME_SLOTS } from "@/lib/constants";
import { useToast } from "@/components/providers/toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ReservationForm() {
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guests: 2, time: "", message: "" },
  });

  const onSubmit = async (data: ReservationInput) => {
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        toast({
          variant: "error",
          title: "Réservation impossible",
          description: json.error ?? "Veuillez réessayer ultérieurement.",
        });
        return;
      }

      setSuccess(true);
      reset();
      toast({
        variant: "success",
        title: "Demande envoyée",
        description: "Nous confirmerons votre table très prochainement.",
      });
    } catch {
      toast({
        variant: "error",
        title: "Erreur réseau",
        description: "Vérifiez votre connexion et réessayez.",
      });
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center border border-gold/30 bg-noir-soft p-12 text-center"
      >
        <CheckCircle2 className="h-16 w-16 text-gold" />
        <h3 className="mt-6 font-serif text-3xl text-ivory">
          Demande reçue
        </h3>
        <p className="mt-4 max-w-sm leading-relaxed text-ivory-muted">
          Merci. Votre demande de réservation a bien été enregistrée. Notre
          équipe vous contactera pour confirmer votre table.
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => setSuccess(false)}
        >
          Nouvelle réservation
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nom complet" error={errors.name?.message}>
          <Input placeholder="Jean Dupont" {...register("name")} />
        </Field>
        <Field label="Téléphone" error={errors.phone?.message}>
          <Input placeholder="+33 6 00 00 00 00" {...register("phone")} />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message}>
        <Input type="email" placeholder="jean@exemple.com" {...register("email")} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Date" error={errors.date?.message}>
          <Input type="date" min={today} {...register("date")} />
        </Field>
        <Field label="Heure" error={errors.time?.message}>
          <Select
            value={watch("time")}
            onValueChange={(v) =>
              setValue("time", v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Convives" error={errors.guests?.message}>
          <Input type="number" min={1} max={20} {...register("guests")} />
        </Field>
      </div>

      <Field label="Message (optionnel)" error={errors.message?.message}>
        <Textarea
          placeholder="Allergies, occasion spéciale, demandes particulières..."
          {...register("message")}
        />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Vérification...
          </>
        ) : (
          <>
            <CalendarCheck /> Demander une réservation
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
