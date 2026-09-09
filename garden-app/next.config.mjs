/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/techspec-digest/garden-perks',
  assetPrefix: '/techspec-digest/garden-perks/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
