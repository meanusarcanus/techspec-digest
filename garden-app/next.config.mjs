const isSubdomain = process.env.NEXT_PUBLIC_SITE_MODE === 'subdomain';

const nextConfig = {
  output: 'export',
  basePath: isSubdomain ? '' : '/garden-perks',
  assetPrefix: isSubdomain ? '' : '/garden-perks/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
