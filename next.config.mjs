/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp-next-be.satyam95.tech",
      },
    ],
  },
};

export default nextConfig;
