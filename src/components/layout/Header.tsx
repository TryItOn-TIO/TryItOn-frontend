"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// 클라이언트 전용으로 SearchInput 불러오기
const SearchInput = dynamic(() => import("@/components/common/SearchInput"), {
  ssr: false,
});
import { usePathname } from "next/navigation";
import { CATEGORY, CATEGORY_LABELS } from "@/constants/category";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  // Hydration 문제 해결을 위해 클라이언트에서만 pathname 사용
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 클라이언트에서만 활성 상태 확인
  const isActiveCategory = (categoryId: number) => {
    if (!isClient) return false;
    return (
      pathname === `/category/${categoryId}` ||
      (pathname === "/" && categoryId === 0)
    );
  };

  // 사용자 메뉴 활성 상태 확인
  const isActiveUserMenu = (menuPath: string) => {
    if (!isClient) return false;
    return pathname.startsWith(menuPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" width={40} height={40} alt="logo" />
            </Link>

            {/* Desktop Navigation - 카테고리 통합 */}
            <nav className="hidden lg:flex items-center gap-6">
              {Object.values(CATEGORY)
                .filter((v) => typeof v === "number")
                .map((categoryId) => (
                  <Link
                    key={categoryId}
                    href={categoryId === 0 ? "/" : `/category/${categoryId}`}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-900 ${
                      isActiveCategory(categoryId as number)
                        ? "text-black font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {CATEGORY_LABELS[categoryId as CATEGORY]}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="상품을 검색하세요"
                className="pl-10 pr-4 py-2 w-full bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-full focus:outline-none transition-all duration-200 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  // 로그인한 사용자 메뉴
                  <>
                    {/* 옷장 */}
                    <Link
                      href="/closet"
                      className={`flex items-center gap-2 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50 ${
                        isActiveUserMenu("/closet")
                          ? "text-black font-bold"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="3"
                          width="16"
                          height="18"
                          rx="2"
                          strokeWidth={2}
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v18M8 8v2M16 8v2"
                        />
                        <circle cx="10" cy="12" r="0.5" fill="currentColor" />
                        <circle cx="14" cy="12" r="0.5" fill="currentColor" />
                      </svg>
                      <span className="hidden lg:inline text-sm">옷장</span>
                    </Link>

                    {/* 장바구니 */}
                    <Link
                      href="/cart"
                      className={`flex items-center gap-2 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50 ${
                        isActiveUserMenu("/cart")
                          ? "text-black font-bold"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 6h12l-1.5 9H7.5L6 6zM6 6L4 4"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10v2M12 10v2M16 10v2"
                        />
                      </svg>
                      <span className="hidden lg:inline text-sm">장바구니</span>
                    </Link>

                    {/* 마이페이지 */}
                    <Link
                      href="/mypage"
                      className={`flex items-center gap-2 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50 ${
                        isActiveUserMenu("/mypage")
                          ? "text-black font-bold"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="hidden lg:inline text-sm">
                        마이페이지
                      </span>
                    </Link>
                  </>
                ) : (
                  // 로그인하지 않은 사용자 메뉴
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="hidden lg:inline text-sm">로그인</span>
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="px-2">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="상품을 검색하세요"
                  className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="px-2 space-y-1">
              {Object.values(CATEGORY)
                .filter((v) => typeof v === "number")
                .map((categoryId) => (
                  <Link
                    key={categoryId}
                    href={categoryId === 0 ? "/" : `/category/${categoryId}`}
                    className={`block py-3 px-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActiveCategory(categoryId as number)
                        ? "text-black font-bold bg-gray-100"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {CATEGORY_LABELS[categoryId as CATEGORY]}
                  </Link>
                ))}
            </nav>

            {/* Mobile Login/User Menu */}
            <div className="px-2 pt-2 border-t border-gray-100">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    // 로그인한 사용자 모바일 메뉴
                    <div className="space-y-1">
                      <Link
                        href="/closet"
                        className={`flex items-center gap-3 py-3 px-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActiveUserMenu("/closet")
                            ? "text-black font-bold bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="4"
                            y="3"
                            width="16"
                            height="18"
                            rx="2"
                            strokeWidth={2}
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v18M8 8v2M16 8v2"
                          />
                          <circle cx="10" cy="12" r="0.5" fill="currentColor" />
                          <circle cx="14" cy="12" r="0.5" fill="currentColor" />
                        </svg>
                        옷장
                      </Link>
                      <Link
                        href="/cart"
                        className={`flex items-center gap-3 py-3 px-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActiveUserMenu("/cart")
                            ? "text-black font-bold bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 6h12l-1.5 9H7.5L6 6zM6 6L4 4"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10v2M12 10v2M16 10v2"
                          />
                        </svg>
                        장바구니
                      </Link>
                      <Link
                        href="/mypage"
                        className={`flex items-center gap-3 py-3 px-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActiveUserMenu("/mypage")
                            ? "text-black font-bold bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        마이페이지
                      </Link>
                    </div>
                  ) : (
                    // 로그인하지 않은 사용자 모바일 메뉴
                    <Link
                      href="/signin"
                      className="flex items-center gap-3 py-3 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      로그인
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
