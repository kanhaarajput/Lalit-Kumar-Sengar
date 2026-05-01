import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Allow up to 10MB uploads (for PDF CV/resume files)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  serverExternalPackages: ['genkit', '@genkit-ai/core', '@genkit-ai/firebase', '@opentelemetry/exporter-jaeger'],
};

export default nextConfig;
