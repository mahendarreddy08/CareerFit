/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  poweredByHeader: false,
  output: "export",
  basePath: "/CareerFit",
  assetPrefix: "/CareerFit/",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
