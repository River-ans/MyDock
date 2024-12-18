import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: undefined, // Turbopack 비활성화
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'], // Webpack 로더 설정
    });
    return config;
  },
};

export default nextConfig;
