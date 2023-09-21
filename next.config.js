/** @type {import('next').NextConfig} */
// test

const nextConfig = {
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals.push({
          "utf-8-validate": "commonjs utf-8-validate",
          bufferutil: "commonjs bufferutil"
        });
    
        config.plugins.push(
          new webpack.IgnorePlugin({
            resourceRegExp: /prerender error: Cannot read properties of undefined \(reading 'headers'\)/,
          })
        );
        
        return config;
      },
      async headers() {
        return [
          {
            // matching all API routes
            source: "/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          }
        ]
      }
}

module.exports = nextConfig
