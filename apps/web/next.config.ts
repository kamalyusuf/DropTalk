import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["types"],
  bundlePagesRouterDependencies: true,
  logging: false,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"]
  }
};

export default config;
