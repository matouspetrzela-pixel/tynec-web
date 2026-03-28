/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Na Windows často padá dev s chybou „Cannot find module './XXX.js'“ kvůli
   * poškozené webpack cache. Vypnutí cache = pomalejší první kompilace, ale stabilnější.
   * Po této chybě vždy: npm run clean && npm run dev (nebo npm run dev:clean).
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
