import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validations";
import { MAX_CAPACITY_PER_SLOT } from "@/lib/constants";
import { requireAdmin } from "@/lib/api-helpers";

// POST — public reservation request with availability check
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Données invalides" },
        { status: 400 }
      );
    }

    const { name, phone, email, guests, date, time, message } = parsed.data;
    const reservationDate = new Date(date);

    if (Number.isNaN(reservationDate.getTime())) {
      return NextResponse.json({ error: "Date invalide" }, { status: 400 });
    }

    // Availability: sum guests already booked (pending or confirmed) for the slot.
    const dayStart = new Date(reservationDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(reservationDate);
    dayEnd.setHours(23, 59, 59, 999);

    const existing = await prisma.reservation.aggregate({
      where: {
        date: { gte: dayStart, lte: dayEnd },
        time,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      _sum: { guests: true },
    });

    const booked = existing._sum.guests ?? 0;
    const remaining = MAX_CAPACITY_PER_SLOT - booked;

    if (guests > remaining) {
      return NextResponse.json(
        {
          error:
            remaining > 0
              ? `Il ne reste que ${remaining} place(s) pour ce créneau. Choisissez un autre horaire.`
              : "Ce créneau est complet. Merci de choisir un autre horaire.",
          remaining,
        },
        { status: 409 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        email,
        guests,
        date: reservationDate,
        time,
        message: message || null,
      },
    });

    return NextResponse.json(
      { success: true, reservation, remaining: remaining - guests },
      { status: 201 }
    );
  } catch (err) {
    console.error("Reservation POST error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 }
    );
  }
}

// GET — admin: list all reservations
export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ reservations });
}
