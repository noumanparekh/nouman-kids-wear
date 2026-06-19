import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow remote placeholder kidswear photos. These are demo images only and
    // must be replaced with real Nouman Kids Wear product photography later.
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
};

export default nextConfig;
