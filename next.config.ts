import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // (임시) 빌드 시 ESLint 검사 건너뛰기
  },
  images: {
    unoptimized: true, // 이미지 최적화 비활성화 (정적 배포용)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
