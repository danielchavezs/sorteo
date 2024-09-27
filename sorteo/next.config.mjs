/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuración adicional para permitir el consumo de imágenes desde este dominio.
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.icons8.com',
          },
        ],
      },
};

export default nextConfig;
