import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { RESTAURANT } from "@/lib/constants";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${RESTAURANT.fullName} — Restaurant Gastronomique`,
    template: `%s · ${RESTAURANT.name}`,
  },
  description: RESTAURANT.description,
  keywords: [
    "restaurant gastronomique",
    "restaurant étoilé",
    "haute cuisine",
    "fine dining",
    "Paris",
    "menu dégustation",
    "réservation restaurant",
  ],
  authors: [{ name: RESTAURANT.fullName }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    title: `${RESTAURANT.fullName} — Restaurant Gastronomique`,
    description: RESTAURANT.description,
    siteName: RESTAURANT.fullName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: RESTAURANT.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESTAURANT.fullName} — Restaurant Gastronomique`,
    description: RESTAURANT.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <AuthSessionProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
