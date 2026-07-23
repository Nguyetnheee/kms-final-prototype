/** @type {import('next').NextConfig} */
const nextConfig = {
  // Never let `next dev` and `next build` share generated artifacts.
  distDir: process.env.NODE_ENV === "development" ? ".next-kms-dev" : ".next-kms-prod",
};

module.exports = nextConfig;
