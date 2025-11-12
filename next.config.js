/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for deployment
  output: 'standalone',
  
  // Transpile ESM packages that need to be compiled
  transpilePackages: ['@react-pdf/renderer'],
  
  // Turbopack configuration (Next.js 16+)
  turbopack: {},
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  
  // Keep webpack config for backward compatibility
  webpack: (config, { isServer }) => {
    // Setting resolve.alias to false tells webpack to ignore a module
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    // Handle PDF.js and canvas modules - mark as external for server
    if (isServer) {
      config.externals = config.externals || [];
      // Mark @react-pdf/renderer and canvas as external for server builds
      config.externals.push('canvas', '@react-pdf/renderer', 'pdfjs-dist');
    }
    
    return config;
  },
};

module.exports = nextConfig;
