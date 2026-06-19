import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only allow images from trusted sources
    // Limiting remote patterns prevents potential SSRF attacks
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
    // Next.js 16 restricts allowed qualities to [75] by default. We use a couple
    // of levels for crisp product imagery.
    qualities: [70, 80, 90],
  },

  // Security headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
