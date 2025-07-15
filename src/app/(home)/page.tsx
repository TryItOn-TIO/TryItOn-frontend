"use client";

import { useEffect, useState } from "react";
import { getAccessToken } from "@/utils/auth";
import HomeClientWrapper from "@/app/(home)/_components/HomeClientWrapper"; // 로그인된 사용자용
import HeroSection from "@/components/HeroSection"; // 비로그인 사용자용
// import StoryShowcase from "@/components/StoryShowcase";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (isLoggedIn) {
    // 로그인 사용자용 홈
    return <HomeClientWrapper />;
  }

  // 비로그인 사용자 랜딩 화면
  return (
    <div className="w-full">
      {/* <div className="max-w-[1440px] mx-auto px-4"> */}
      <main>
        <HeroSection />
        {/* <StoryShowcase /> */}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
