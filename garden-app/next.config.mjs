const isSubdomain = process.env.NEXT_PUBLIC_SITE_MODE === 'subdomain';

const nextConfig = {
  output: 'export',
  basePath: isSubdomain ? '' : '/techspec-digest/garden-perks',
  assetPrefix: isSubdomain ? '' : '/techspec-digest/garden-perks/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
