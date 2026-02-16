import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "esapdev.site",
      "isomorphic-furyroad.s3.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "esapdev.site",
        pathname: "/profile_pictures/**",
      },
      {
        protocol: "https",
        hostname: "esapdev.site",
      },
      {
        protocol: "https",
        hostname: "esapdev.site",
        pathname: "/profile_pictures/**",
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ["core"],
}

export default withNextIntl(nextConfig)
