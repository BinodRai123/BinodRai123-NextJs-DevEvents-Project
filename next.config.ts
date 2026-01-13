import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript: {
      ignoreBuildErrors: true,
   },
   cacheComponents: true,
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "res.cloudinary.com",
         },
      ],
   },
   async headers() {
      return [
         {
            source: "/:path*",
            headers: [
               {
                  key: "X-Robots-Tag",
                  value: "index, follow", // This tells Google to index your pages
               },
            ],
         },
      ];
   },
   /* config options here */
};

export default nextConfig;
