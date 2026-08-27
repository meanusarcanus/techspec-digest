/** @type {import('next').NextConfig} */
const isGhPages = process.env.NODE_ENV === 'production';
const basePath = isGhPages ? '/techspec-digest/consciousness' : '';

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
