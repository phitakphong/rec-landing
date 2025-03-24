const { i18n } = require("./i18n/next-i18next.config");
const nextConfig = {
  i18n,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'pntdev.ddns.net',
        port: '28092',
        pathname: '/REG/Banner/**', // Adjust the path if needed
      },
    ],
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
    ],
  },
};

module.exports = nextConfig;
