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
            hostname: "airbnbnew.cybersoft.edu.vn",
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'https',
            hostname: "dynamic-media-cdn.tripadvisor.com",
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'https',
            hostname: "phunugioi.com",
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'https',
            hostname: "avatars.githubusercontent.com",
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
        {
            protocol: 'http',
            hostname: 'alicdn.com',
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'http',
            hostname: 'sc04.alicdn.com',
            port: '',
            pathname: '/**'
        },
        ]
}
};

export default nextConfig;
