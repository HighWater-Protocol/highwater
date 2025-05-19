import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable source maps in all environments
  productionBrowserSourceMaps: true,
  
  // Configuration that works with both Webpack and Turbopack
  experimental: {
    // Turbopack specific configurations
    turbo: process.env.TURBOPACK ? {
      // Turbopack specific options can go here
    } : undefined,
  },
  
  // Webpack configuration (ignored when using Turbopack)
  webpack: (config, { isServer, dev }) => {
    // Only configure Webpack if not using Turbopack
    if (!process.env.TURBOPACK) {
      // This ensures source maps are generated in development and production
      if (!isServer) {
        config.devtool = dev ? 'eval-source-map' : 'source-map';
      }
    }
    
    return config;
  }
};

// Log which bundler is being used
console.log(`Using ${process.env.TURBOPACK ? 'Turbopack' : 'Webpack'} as the bundler`);

export default nextConfig;
