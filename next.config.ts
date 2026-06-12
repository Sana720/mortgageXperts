import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── SECURITY HEADERS ──────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stop MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Strict referrer policy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — restrict powerful APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          // HSTS — only in production (let Next handle dev without HTTPS)
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),
        ],
      },
    ];
  },

  // ── IMAGE OPTIMISATION ────────────────────────────────────────────
  images: {
    // Allow optimizing images served from the same origin
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
    // Prefer modern formats
    formats: ["image/avif", "image/webp"],
  },

  // ── COMPRESSION ───────────────────────────────────────────────────
  compress: true,
};

export default nextConfig;
