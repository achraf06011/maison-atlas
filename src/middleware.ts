export { default } from "next-auth/middleware";

// Protect the dashboard index and every /admin route except the login page.
export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
