import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);

  // Already authenticated — skip the form and go straight to the dashboard.
  if (session?.user) {
    redirect("/admin");
  }

  return <LoginForm />;
}
