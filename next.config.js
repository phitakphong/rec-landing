const { i18n } = require("./i18n/next-i18next.config");
const nextConfig = {
  i18n,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
    runtime: "edge",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
