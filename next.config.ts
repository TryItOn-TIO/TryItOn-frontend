
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export', // SSR 활성화를 위해 주석 처리
  eslint: {
    ignoreDuringBuilds: true, // (임시) 빌드 시 ESLint 검사 건너뛰기
  },
  images: {
    // unoptimized: true, // 이미지 최적화 활성화
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tio-image-storage-jungle8th.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // 정적 파일을 S3에서 로드 (하이브리드 배포)
  assetPrefix: process.env.NODE_ENV === 'production'
      ? 'https://tio-frontend-assets-jungle8th.s3.ap-northeast-2.amazonaws.com'
      : '',
};

export default nextConfig;