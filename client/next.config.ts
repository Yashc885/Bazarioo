/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
        pathname: "/**", // Allow all images from this domain
      },
    ],
  },
};

export default nextConfig;
