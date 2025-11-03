import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for Vercel deployment
  output: "standalone",

  // Environment variables validation
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
