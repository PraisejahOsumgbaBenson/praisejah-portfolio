/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for React
  reactStrictMode: true,

  // Allow dev access from local network devices
  allowedDevOrigins: ["http://192.168.2.195:3001", "http://192.168.2.195:3002"],

  // Turbopack config (empty but required for Next.js 16+)
  turbopack: {},

  // Configure webpack for font files and audio (fallback)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });
    return config;
  },

  // Image optimization config
  images: {
    domains: [],
    unoptimized: true, // For static export if needed
  },
};

module.exports = nextConfig;
