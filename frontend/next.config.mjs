/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Prevent type-checking and linting on build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configure webpack to handle SVG and suppress warnings
  webpack(config) {
    // Suppress webpack errors
    config.infrastructureLogging = {
      level: "error",
    };

    // Add SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  // Allow images from external domains
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "localhost",
      "firebasestorage.googleapis.com",
    ],
  },

  // Improve production performance
  productionBrowserSourceMaps: false,
};

export default nextConfig;
