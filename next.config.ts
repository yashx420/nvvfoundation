import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "https://nvvfoundation.vercel.app/contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
