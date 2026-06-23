import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { galleryImageSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/api-helpers";

// GET — public: all gallery images
export async function GET() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ images });
}

// POST — admin: add a gallery image
export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const parsed = galleryImageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const image = await prisma.galleryImage.create({
    data: { ...parsed.data, title: parsed.data.title || null },
  });
  return NextResponse.json({ image }, { status: 201 });
}
