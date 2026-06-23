import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * Returns the session if the requester is an authenticated admin,
 * otherwise returns a 401 NextResponse to short-circuit the handler.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return {
      session: null,
      error: NextResponse.json({ error: "Non autorisé" }, { status: 401 }),
    };
  }
  return { session, error: null };
}
