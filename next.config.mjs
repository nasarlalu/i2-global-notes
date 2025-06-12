/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        MONGOURI: process.env.MONGOURI,
        JWT_SECRET: process.env.JWT_SECRET
    }
};

export default nextConfig;
