/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wpecom.satyam.works",
      },
    ],
  },
};

export default nextConfig;
