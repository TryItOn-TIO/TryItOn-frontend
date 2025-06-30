import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export' // S3 정적파일 배포위한 설정 추가 (npm build run시 정적파일이 ./out 폴더에 생성)
};

export default nextConfig;
