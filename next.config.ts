import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  async redirects() {
    return [
      { source: "/photography", destination: "/work/photography", permanent: false },
      { source: "/foods", destination: "/work/foods", permanent: false },
    ];
  },
};

export default nextConfig;