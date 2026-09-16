/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false

const basePath = isGithubActions ? "/CareerFit" : ""
const assetPrefix = isGithubActions ? "/CareerFit/" : ""

const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  poweredByHeader: false,
  output: "export",
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
