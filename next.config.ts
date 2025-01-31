import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "./src/app/styles/variables.scss" as *;`,
  },
  eslint: {
    dirs: ['app', 'src'],
  },
};

export default nextConfig;
