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
     {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "images.thenorthface.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        pathname: "/**", // Allow all images from this domain
      },     
       {
        protocol: "https",
        hostname: "www.esteelauder.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "images.ray-ban.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "www.lego.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "www.ikea.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "www.patek.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "hudabeauty.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "www.ugg.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "www.dyson.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "media.gucci.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "www.montblanc.com",
        pathname: "/**", // Allow all images from this domain
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "/**", // Allow all images from this domain
      },
    ],
  },
};

export default nextConfig;
