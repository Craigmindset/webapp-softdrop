/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure SWC is used for compilation
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: false,
  },
}

module.exports = nextConfig

