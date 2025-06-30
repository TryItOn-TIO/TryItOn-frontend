import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // S3 정적파일 배포위한 설정 추가 (npm build run시 정적파일이 ./out 폴더에 생성)
  eslint: {
      ignoreDuringBuilds: true, // (임시) 빌드 시 ESLint 검사 건너뛰기
      }
  images: {
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
