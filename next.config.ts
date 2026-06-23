import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Accept image URLs from any HTTPS host (admins paste links from
    // Unsplash, ImgBB, Supabase Storage, Google Drive direct links, etc.).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  eslint: {
    // ESLint is optional here; never block production builds on lint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
