import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // The login page renders without the dashboard chrome.
  // Protected routes are guarded by middleware (redirect to /admin/login).
  if (!session?.user) {
    return <>{children}</>;
  }

  return <AdminShell userName={session.user.name}>{children}</AdminShell>;
}
