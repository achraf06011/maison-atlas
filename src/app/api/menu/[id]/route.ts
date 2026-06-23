import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { menuItemSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/api-helpers";

function revalidatePublic() {
  revalidatePath("/menu");
  revalidatePath("/");
}

// PATCH — admin: update a menu item
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const parsed = menuItemSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const item = await prisma.menuItem.update({
    where: { id },
    data: parsed.data,
  });
  revalidatePublic();
  return NextResponse.json({ item });
}

// DELETE — admin: remove a menu item
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.menuItem.delete({ where: { id } });
  revalidatePublic();
  return NextResponse.json({ success: true });
}
