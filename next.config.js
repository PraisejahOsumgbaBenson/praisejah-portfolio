/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for React
  reactStrictMode: true,

  // Configure webpack for font files and audio
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
