/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  poweredByHeader: false,
  output: "export",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
