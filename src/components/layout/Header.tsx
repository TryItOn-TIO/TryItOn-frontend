"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Search, User, Menu, X } from "lucide-react";
import { getAccessToken } from "@/utils/auth";
import { CATEGORY, CATEGORY_LABELS } from "@/constants/category";

// 클라이언트 전용으로 SearchInput 불러오기
const SearchInput = dynamic(() => import("@/components/common/SearchInput"), {
  ssr: false,
});

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token); // 토큰 존재 여부로 로그인 판별
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 로그인 여부 판단이 끝나지 않은 상태에서는 아무것도 렌더링하지 않음
  if (isLoggedIn === null) return null;

  return (
    <header className="h-16 sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="h-full max-w-[1440px] mx-auto px-4">
        {/* 데스크탑 헤더 */}
        <div className="hidden md:flex items-center justify-between py-4">
          {/* 좌측: 로고 & 카테고리 */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900">TIO</h1>
            </Link>

            <nav className="hidden lg:flex items-center gap-5">
              {Object.values(CATEGORY)
                .filter((v) => typeof v === "number")
                .map((id) => (
                  <Link
                    key={id}
                    href={id === 0 ? "/" : `/category/${id}`}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {CATEGORY_LABELS[id as CATEGORY]}
                  </Link>
                ))}
            </nav>
          </div>

          {/* 중앙: 검색창 */}
          <div className="flex-grow mx-8">
            <SearchInput />
          </div>

          {/* 우측: 로그인 or 유저 메뉴(옷장, 장바구니, 마이페이지) */}
          <div className="flex items-center gap-4">
            {!isLoggedIn && (
              <Link
                href="/signin"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <User className="w-4 h-4" />
                로그인
              </Link>
            )}

            {isLoggedIn && (
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <Link href="/closet">옷장</Link>
                <Link href="/cart">장바구니</Link>
                <Link href="/mypage">
                  <Image
                    src="/images/common/mypage.svg"
                    width={24}
                    height={24}
                    alt="mypage"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 모바일 헤더 */}
        <div className="flex md:hidden items-center gap-2 py-3">
          {/* 로고 */}
          <Link href="/">
            <h1 className="text-xl font-bold text-gray-900">TIO</h1>
          </Link>

          {/* 검색창 */}
          <div className="flex-grow min-w-0">
            <SearchInput />
          </div>

          {/* 햄버거 버튼 */}
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {menuOpen && (
            <div className="fixed top-0 left-0 w-full h-screen bg-white z-[9999] overflow-y-auto">
              {/* 상단 헤더 (로고 + 검색창 + X) */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                <Link href="/">
                  <h1 className="text-xl font-bold text-gray-900">TIO</h1>
                </Link>

                <div className="flex-grow min-w-0">
                  <SearchInput onSearch={() => setMenuOpen(false)} />
                </div>

                <button onClick={toggleMenu}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 카테고리 메뉴 */}
              <nav className="flex flex-wrap gap-3 px-4 py-4">
                {Object.values(CATEGORY)
                  .filter((v) => typeof v === "number")
                  .map((id) => (
                    <Link
                      key={id}
                      href={id === 0 ? "/" : `/category/${id}`}
                      className="text-base text-gray-800 hover:text-blue-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      {CATEGORY_LABELS[id as CATEGORY]}
                    </Link>
                  ))}
              </nav>

              {/* 로그인 or 유저 메뉴 */}
              <div className="flex flex-col px-4 gap-4 mt-2 border-t border-gray-200 pt-4 pb-6">
                {isLoggedIn ? (
                  <>
                    <Link href="/closet" onClick={() => setMenuOpen(false)}>
                      옷장
                    </Link>
                    <Link href="/cart" onClick={() => setMenuOpen(false)}>
                      장바구니
                    </Link>
                    <Link href="/mypage" onClick={() => setMenuOpen(false)}>
                      마이페이지
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 text-base text-gray-800 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    로그인
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
