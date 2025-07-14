"use client";

import React from "react";
import Link from "next/link";
import AvatarPreview from "@/components/AvatarPreview";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:bg-blue-200 transition-colors duration-200">
            <svg
              className="w-4 h-4 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            나만의 2D 아바타로 옷 입어보기 체험
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            가상으로 입어보고
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              완벽한 스타일 찾기
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            회원가입하면 나만의 2D 아바타가 생성됩니다.
            <br className="hidden sm:block" />
            아래에서 미리 체험해보고 마음에 드시면 가입해보세요!
          </p>
        </div>

        {/* Interactive Try-On Experience */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-12 hover:shadow-3xl transition-shadow duration-300">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              👗 지금 바로 체험해보세요!
            </h2>
            <p className="text-gray-600">옷을 클릭하면 아바타가 입어봅니다</p>
          </div>

          {/* Avatar Preview Component */}
          <AvatarPreview />
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <Link
            href="/signin"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 hover:shadow-xl hover:scale-105 group"
          >
            무료 회원가입하고 내 아바타 만들기
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <p className="text-sm text-gray-500">
            이미 계정이 있으신가요?
            <Link
              href="/signin"
              className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline"
            >
              로그인하기
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
