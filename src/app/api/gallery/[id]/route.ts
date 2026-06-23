import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { galleryImageSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/api-helpers";

function revalidatePublic() {
  revalidatePath("/galerie");
  revalidatePath("/");
}

// PATCH — admin: update a gallery image
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const parsed = galleryImageSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const image = await prisma.galleryImage.update({
    where: { id },
    data: parsed.data,
  });
  revalidatePublic();
  return NextResponse.json({ image });
}

// DELETE — admin: remove a gallery image
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePublic();
  return NextResponse.json({ success: true });
}
