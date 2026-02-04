// import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "coin-images.coingecko.com",
      pathname: "/**",
    },],
  },
}

export default nextConfig;

