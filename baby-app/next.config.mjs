/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/techspec-digest/baby-care',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
