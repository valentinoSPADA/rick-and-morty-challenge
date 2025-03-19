import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    domains: ["rickandmortyapi.com"],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
