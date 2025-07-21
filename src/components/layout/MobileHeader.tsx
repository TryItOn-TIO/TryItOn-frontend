"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Menu, X, Sparkles } from "lucide-react";
import { CATEGORY, CATEGORY_LABELS } from "@/constants/category";
import { useAvatarStore } from "@/stores/avatar-store";
import { useTryOnStore } from "@/stores/try-on-store";

interface MobileHeaderProps {
  pathname: string;
  isLoggedIn: boolean;
  openResultModal: () => void;
  SearchInput: React.ComponentType<any>;
}

export default function MobileHeader({
  pathname,
  isLoggedIn,
  openResultModal,
  SearchInput,
}: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarInfo = useAvatarStore((state) => state.avatarInfo);
  const { status, notificationViewed } = useTryOnStore();

  // --- 알림 로직 ---
  const hasUnreadNotification =
    (status === "success" || status === "error") && !notificationViewed;
  const showMobileNotification = hasUnreadNotification;
  // ---------------------
  
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

  const getLinkClassName = (
    base: string,
    active: string,
    inactive: string,
    isActive: boolean
  ) => [base, isActive ? active : inactive].join(" ");

  return (
    <>
      <div className="flex md:hidden items-center gap-2 py-3">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-900">TIO</h1>
        </Link>
        <div className="flex-grow min-w-0">
          <SearchInput />
        </div>

        {/* Try On 버튼 */}
        {isLoggedIn && (
          <button
            onClick={openResultModal}
            className="relative flex-shrink-0"
            aria-label="알림"
          >
            <Image
              src="/images/common/alarm_filled.svg"
              width={23}
              height={23}
              alt="가상피팅"
            />
            {showMobileNotification && (
              <>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
              </>
            )}
          </button>
        )}
        <button onClick={toggleMenu} className="relative">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-white z-[9999] overflow-y-auto">
            {/* 상단 헤더 */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
              <Link href="/">
                <h1 className="text-xl font-bold text-gray-900">TIO</h1>
              </Link>
              <div className="flex-grow min-w-0">
                <SearchInput onSearch={() => setMenuOpen(false)} />
              </div>

              {/* Try On 버튼 */}
              {isLoggedIn && (
                <button
                  onClick={openResultModal}
                  className="relative flex-shrink-0"
                  aria-label="알림"
                >
                  <Image
                    src="/images/common/alarm_filled.svg"
                    width={23}
                    height={23}
                    alt="가상피팅"
                  />
                  {showMobileNotification && (
                    <>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                    </>
                  )}
                </button>
              )}

              <button onClick={toggleMenu}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 모바일 아바타 섹션 & 카테고리 섹션 */}
            <div className="px-4 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-semibold text-gray-900">
                  내 아바타
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                {!isLoggedIn ? (
                  <p className="text-sm text-gray-500">
                    아바타를 만들어보세요
                  </p>
                ) : avatarInfo.products && avatarInfo.products.length > 0 ? (
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
                  <p className="text-sm text-gray-500">
                    아바타를 착용해보세요
                  </p>
                )}
              </div>
            </div>
            <nav className="flex flex-wrap gap-3 px-4 py-4">
              {Object.values(CATEGORY)
                .filter((v) => typeof v === "number")
                .map((id) => {
                  const href = id === 0 ? "/" : `/category/${id}`;
                  const isActive =
                    pathname === href ||
                    (href !== "/" && pathname.startsWith(href));
                  return (
                    <Link
                      key={id}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={getLinkClassName(
                        "text-base transition-colors",
                        "font-bold text-gray-900",
                        "text-gray-800 hover:text-gray-900",
                        isActive
                      )}
                    >
                      {CATEGORY_LABELS[id as CATEGORY]}
                    </Link>
                  );
                })}
            </nav>

            {/* 모바일 로그인 유저 하단 CTA 메뉴 */}
            {isLoggedIn ? (
              <div className="flex flex-col px-4 gap-4 mt-2 border-t border-gray-200 pt-4 pb-6">
                <Link
                  href="/story"
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-gray-800 hover:text-gray-900"
                >
                  스토리
                </Link>
                <Link
                  href="/closet"
                  onClick={() => setMenuOpen(false)}
                  className={getLinkClassName(
                    "transition-colors",
                    "font-bold text-gray-900",
                    "text-gray-800 hover:text-gray-900",
                    pathname.startsWith("/closet")
                  )}
                >
                  옷장
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className={getLinkClassName(
                    "transition-colors",
                    "font-bold text-gray-900",
                    "text-gray-800 hover:text-gray-900",
                    pathname.startsWith("/cart")
                  )}
                >
                  장바구니
                </Link>
                <Link
                  href="/mypage"
                  onClick={() => setMenuOpen(false)}
                  className={getLinkClassName(
                    "transition-colors",
                    "font-bold text-gray-900",
                    "text-gray-800 hover:text-gray-900",
                    pathname.startsWith("/mypage")
                  )}
                >
                  마이페이지
                </Link>
              </div>
            ) : (
              <>
                {/* 모바일 비로그인 유저 하단 CTA 메뉴 */}
                <div className="flex flex-col px-4 gap-4 my-2 border-t border-gray-200 pt-4">
                  <Link
                    href="/story"
                    onClick={() => setMenuOpen(false)}
                    className="text-base text-gray-800 hover:text-gray-900"
                  >
                    스토리
                  </Link>
                </div>
                <div className="flex flex-col px-4 gap-4 my-2 border-t border-gray-200 pt-4">
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 text-base text-gray-800 hover:text-gray-900"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    로그인
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
