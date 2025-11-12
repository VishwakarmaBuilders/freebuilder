/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nextjs has an issue with pdfjs-dist which optionally uses the canvas package
  // for Node.js compatibility. This causes a "Module parse failed" error when
  // building the app. Since pdfjs-dist is only used on client side, we disable
  // the canvas package for webpack
  // https://github.com/mozilla/pdf.js/issues/16214
  
  // Use standalone output for deployment
  output: 'standalone',
  
  webpack: (config, { isServer }) => {
    // Setting resolve.alias to false tells webpack to ignore a module
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    // Ignore browser-specific dependencies during server-side build
    // This prevents DOMMatrix and other browser API errors
    if (isServer) {
      // Ignore specific modules that require browser APIs
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push({
          canvas: 'commonjs canvas',
        });
      }
    }
    
    return config;
  },
};

module.exports = nextConfig;
