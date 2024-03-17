/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.github.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
