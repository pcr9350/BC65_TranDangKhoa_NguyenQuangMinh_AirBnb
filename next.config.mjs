/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'i.pravatar.cc',
            port: '',
            pathname: '**'
        },
        {
            protocol: 'https',
            hostname: 'airbnbnew.cybersoft.edu.vn/',
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'http',
            hostname: 'w3.org',
            port: '',
            pathname: '/**'
        },
        ]
}
};

export default nextConfig;
