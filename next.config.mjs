/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        MONGOURI: process.env.MONGOURI,
        JWT_SECRET: process.env.JWT_SECRET
    }
};

export default nextConfig;
