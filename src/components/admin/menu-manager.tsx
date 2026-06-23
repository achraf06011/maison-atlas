"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import { menuItemSchema, type MenuItemInput } from "@/lib/validations";
import {
  formatPrice,
  MENU_CATEGORY_LABELS,
} from "@/lib/utils";
import { ALLERGEN_OPTIONS } from "@/lib/constants";
import { useToast } from "@/components/providers/toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface MenuRow extends Omit<MenuItemInput, "allergens"> {
  id: string;
  allergens: string[];
}

const CATEGORIES = ["ENTREE", "PLAT", "DESSERT", "BOISSON", "DEGUSTATION"] as const;

export function MenuManager({ initial }: { initial: MenuRow[] }) {
  const { toast } = useToast();
  const [rows, setRows] = useState<MenuRow[]>(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MenuRow | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MenuItemInput>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      category: "PLAT",
      allergens: [],
      featured: false,
      available: true,
      price: 0,
    },
  });

  const selectedAllergens = watch("allergens") ?? [];
  const featured = watch("featured");

  const openCreate = () => {
    setEditing(null);
    reset({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "PLAT",
      allergens: [],
      featured: false,
      available: true,
    });
    setOpen(true);
  };

  const openEdit = (row: MenuRow) => {
    setEditing(row);
    reset(row);
    setOpen(true);
  };

  const toggleAllergen = (a: string) => {
    const next = selectedAllergens.includes(a)
      ? selectedAllergens.filter((x) => x !== a)
      : [...selectedAllergens, a];
    setValue("allergens", next);
  };

  const onSubmit = async (data: MenuItemInput) => {
    const url = editing ? `/api/menu/${editing.id}` : "/api/menu";
    const method = editing ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      if (editing) {
        setRows((prev) =>
          prev.map((r) => (r.id === editing.id ? json.item : r))
        );
        toast({ variant: "success", title: "Plat mis à jour" });
      } else {
        setRows((prev) => [...prev, json.item]);
        toast({ variant: "success", title: "Plat ajouté" });
      }
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
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast({ variant: "success", title: "Plat supprimé" });
    } catch {
      toast({ variant: "error", title: "Échec de la suppression" });
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" /> Ajouter un plat
        </Button>
      </div>

      {rows.length === 0 ? (
        <div className="border border-ivory/10 bg-noir-soft p-16 text-center text-ivory-muted">
          Aucun plat. Ajoutez votre première création.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {rows.map((row) => (
              <motion.div
                key={row.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex gap-4 border border-ivory/10 bg-noir-soft p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden">
                  {row.image && (
                    <Image
                      src={row.image}
                      alt={row.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg text-ivory">{row.name}</h3>
                    {row.featured && (
                      <Star className="h-4 w-4 shrink-0 fill-gold text-gold" />
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-ivory-muted">
                    {row.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {MENU_CATEGORY_LABELS[row.category]}
                      </Badge>
                      <span className="text-sm text-gold">
                        {formatPrice(row.price)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(row)}
                        className="p-1.5 text-ivory-muted transition-colors hover:text-gold"
                        aria-label="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(row.id)}
                        className="p-1.5 text-ivory-muted transition-colors hover:text-red-400"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Modifier le plat" : "Nouveau plat"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...register("description")} />
              {errors.description && (
                <p className="text-xs text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Prix (€)</Label>
                <Input type="number" step="1" {...register("price")} />
                {errors.price && (
                  <p className="text-xs text-red-400">{errors.price.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select
                  value={watch("category")}
                  onValueChange={(v) =>
                    setValue("category", v as MenuItemInput["category"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {MENU_CATEGORY_LABELS[c]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>URL de l&apos;image</Label>
              <Input placeholder="https://..." {...register("image")} />
              {errors.image && (
                <p className="text-xs text-red-400">{errors.image.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Allergènes</Label>
              <div className="flex flex-wrap gap-2">
                {ALLERGEN_OPTIONS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAllergen(a)}
                    className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                      selectedAllergens.includes(a)
                        ? "bg-gold text-noir"
                        : "border border-ivory/15 text-ivory-muted hover:text-ivory"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 text-sm text-ivory">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setValue("featured", e.target.checked)}
                className="h-4 w-4 accent-gold"
              />
              Marquer comme plat signature (mis en avant)
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {editing ? "Enregistrer" : "Ajouter"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
