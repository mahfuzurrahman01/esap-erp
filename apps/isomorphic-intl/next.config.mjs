import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "esapdev.xyz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "isomorphic-furyroad.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ["core"],
  serverExternalPackages: ["sharp", "@react-pdf/renderer", "nodemailer"],
}

export default withNextIntl(nextConfig)
