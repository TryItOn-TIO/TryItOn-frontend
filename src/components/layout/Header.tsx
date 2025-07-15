"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Bell, User, Menu, X, Sparkles } from "lucide-react";
import { getAccessToken } from "@/utils/auth";
import { CATEGORY, CATEGORY_LABELS } from "@/constants/category";
import { useAvatarStore } from "@/stores/avatar-store";

// 클라이언트 전용으로 SearchInput 불러오기
const SearchInput = dynamic(() => import("@/components/common/SearchInput"), {
  ssr: false,
});

const AvatarModal = dynamic(() => import("@/components/ui/AvatarModal"), {
  ssr: false,
});

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const avatarInfo = useAvatarStore((state) => state.avatarInfo);
  const hasAvatarUpdate = useAvatarStore((state) => state.hasAvatarUpdate);
  const setHasAvatarUpdate = useAvatarStore(
    (state) => state.setHasAvatarUpdate
  );

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

    if (menuOpen && hasAvatarUpdate) {
      setHasAvatarUpdate(false); // 메뉴 열리면 알림 제거
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, hasAvatarUpdate, setHasAvatarUpdate]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 로그인 여부 판단이 끝나지 않은 상태에서는 아무것도 렌더링하지 않음
  if (isLoggedIn === null) return null;

  return (
    <>
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

            {/* 알림 버튼 */}
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="relative flex-shrink-0"
              aria-label="알림"
            >
              <Bell className="w-5 h-5">
                {hasAvatarUpdate && (
                  <>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                  </>
                )}
              </Bell>
            </button>

            {/* 햄버거 버튼 */}
            <button onClick={toggleMenu} className="relative">
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* 모바일 메뉴 */}
            {menuOpen && (
              <div className="fixed top-0 left-0 w-full h-screen bg-white z-[9999] overflow-y-auto">
                {/* 상단: 검색 + X */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                  <Link href="/">
                    <h1 className="text-xl font-bold text-gray-900">TIO</h1>
                  </Link>
                  <div className="flex-grow min-w-0">
                    <SearchInput onSearch={() => setMenuOpen(false)} />
                  </div>
                  <button
                    onClick={() => setIsAvatarModalOpen(true)}
                    className="relative flex-shrink-0"
                    aria-label="알림"
                  >
                    <Bell className="w-5 h-5">
                      {hasAvatarUpdate && (
                        <>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                        </>
                      )}
                    </Bell>
                  </button>
                  <button onClick={toggleMenu}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 아바타 프리뷰 */}
                <div className="px-4 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      내 아바타
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    {!isLoggedIn ? (
                      // 로그인하지 않은 경우
                      <p className="text-sm text-gray-500">
                        아바타를 만들어보세요
                      </p>
                    ) : avatarInfo.products &&
                      avatarInfo.products.length > 0 ? (
                      // 로그인했고, 아이템 착용 중인 경우
                      <div className="flex gap-3 items-center">
                        <div className="w-24 h-24 rounded-xl overflow-hidden">
                          <img
                            src={avatarInfo.avatarImgUrl}
                            alt="아바타"
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-800 font-medium">
                            현재 착용 중
                          </p>
                          <p className="text-xs text-gray-500">
                            {avatarInfo.products.length}개 아이템
                          </p>
                        </div>
                      </div>
                    ) : (
                      // 로그인했지만 착용 아이템 없음
                      <p className="text-sm text-gray-500">
                        아바타를 착용해보세요
                      </p>
                    )}
                  </div>
                </div>

                {/* 카테고리 */}
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

      {/* 아바타 모달 */}
      {isAvatarModalOpen && (
        <AvatarModal
          onClose={() => setIsAvatarModalOpen(false)}
          isLoggedIn={isLoggedIn ?? false}
        />
      )}
    </>
  );
}
