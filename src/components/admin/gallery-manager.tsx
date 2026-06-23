"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { galleryImageSchema, type GalleryImageInput } from "@/lib/validations";
import { GALLERY_CATEGORY_LABELS } from "@/lib/utils";
import { useToast } from "@/components/providers/toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GalleryRow {
  id: string;
  image: string;
  title: string | null;
  category: GalleryImageInput["category"];
}

const CATEGORIES = ["SALLE", "TERRASSE", "CUISINE", "EVENEMENTS", "PLATS"] as const;

export function GalleryManager({ initial }: { initial: GalleryRow[] }) {
  const { toast } = useToast();
  const [rows, setRows] = useState<GalleryRow[]>(initial);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GalleryImageInput>({
    resolver: zodResolver(galleryImageSchema),
    defaultValues: { category: "SALLE", title: "", image: "" },
  });

  const openCreate = () => {
    reset({ category: "SALLE", title: "", image: "" });
    setOpen(true);
  };

  const onSubmit = async (data: GalleryImageInput) => {
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setRows((prev) => [json.image, ...prev]);
      toast({ variant: "success", title: "Image ajoutée" });
      setOpen(false);
    } catch (e) {
      toast({
        variant: "error",
        title: "Erreur",
        description: e instanceof Error ? e.message : undefined,
      });
    }
  };

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast({ variant: "success", title: "Image supprimée" });
    } catch {
      toast({ variant: "error", title: "Échec de la suppression" });
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" /> Ajouter une image
        </Button>
      </div>

      {rows.length === 0 ? (
        <div className="border border-ivory/10 bg-noir-soft p-16 text-center text-ivory-muted">
          Aucune image dans la galerie.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {rows.map((row) => (
              <motion.div
                key={row.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-square overflow-hidden border border-ivory/10"
              >
                <Image
                  src={row.image}
                  alt={row.title ?? "Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 flex flex-col justify-between bg-noir/60 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex justify-end">
                    <button
                      onClick={() => remove(row.id)}
                      className="flex h-8 w-8 items-center justify-center bg-red-500/80 text-ivory transition-colors hover:bg-red-500"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <Badge variant="solid">
                      {GALLERY_CATEGORY_LABELS[row.category]}
                    </Badge>
                    {row.title && (
                      <p className="mt-2 font-serif text-sm text-ivory">
                        {row.title}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle image</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label>URL de l&apos;image</Label>
              <Input placeholder="https://..." {...register("image")} />
              {errors.image && (
                <p className="text-xs text-red-400">{errors.image.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Titre (optionnel)</Label>
              <Input {...register("title")} />
            </div>
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={watch("category")}
                onValueChange={(v) =>
                  setValue("category", v as GalleryImageInput["category"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {GALLERY_CATEGORY_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Ajouter
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
