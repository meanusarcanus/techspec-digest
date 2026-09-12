/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/baby-care',
  assetPrefix: '/baby-care/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
