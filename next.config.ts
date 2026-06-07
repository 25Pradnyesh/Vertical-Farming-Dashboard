import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig = {

  images: {

    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.205.251.245',
        port: '5000',
        pathname: '/images/**',
      },
    ],

  },

};

module.exports = nextConfig;
export default nextConfig;
