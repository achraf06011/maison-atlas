import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { menuItemSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/api-helpers";

// GET — public: all menu items
export async function GET() {
  const items = await prisma.menuItem.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ items });
}

// POST — admin: create a menu item
export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const parsed = menuItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const item = await prisma.menuItem.create({ data: parsed.data });
  revalidatePath("/menu");
  revalidatePath("/");
  return NextResponse.json({ item }, { status: 201 });
}
