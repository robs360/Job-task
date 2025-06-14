/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
  },
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: 'https://job-task-server-production.up.railway.app/socket.io/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
