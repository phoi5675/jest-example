import path from "path";

const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: {
    resolve: {
      alias: {
        "@/": path.resolve(__dirname, "./src/"),
      },
    },
  },
};

export default nextConfig;
