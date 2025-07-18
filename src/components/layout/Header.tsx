"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User, Menu, X, Sparkles } from "lucide-react";
import { getAccessToken } from "@/utils/auth";
import { CATEGORY, CATEGORY_LABELS } from "@/constants/category";
import { useAvatarStore } from "@/stores/avatar-store";
import { useTryOnStore } from "@/stores/try-on-store";

const SearchInput = dynamic(() => import("@/components/common/SearchInput"), {
  ssr: false,
});

const TryOnResultModal = dynamic(
  () => import("@/components/ui/TryOnResultModal"),
  {
    ssr: false,
  }
);

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const avatarInfo = useAvatarStore((state) => state.avatarInfo);
  const { status, notificationViewed, viewNotification } = useTryOnStore();

  // --- 알림 로직 ---
  const hasUnreadNotification =
    (status === "success" || status === "error") && !notificationViewed;
  const isDetailPage = pathname.startsWith("/detail");

  // 데스크탑: 상세 페이지에서만 '마이페이지' 아이콘에 알림 표시
  const showDesktopNotification = hasUnreadNotification && isDetailPage;
  // 모바일: 페이지와 상관없이 항상 'alarm_filled' 아이콘에 알림 표시
  const showMobileNotification = hasUnreadNotification;
  // ---------------------

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);
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

  const openResultModal = () => {
    setIsResultModalOpen(true);
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
    viewNotification(); // 모달 닫을 때 알림 읽음 처리
  };

  const handleMypageClick = (e: React.MouseEvent) => {
    if (showDesktopNotification) {
      e.preventDefault();
      openResultModal();
    }
  };

  if (isLoggedIn === null) return null;

  const getLinkClassName = (
    base: string,
    active: string,
    inactive: string,
    isActive: boolean
  ) => [base, isActive ? active : inactive].join(" ");

  return (
    <>
      <header className="h-16 sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="h-full max-w-[1440px] mx-auto px-4">
          {/* --- 데스크탑 헤더 --- */}
          <div className="hidden md:flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Link href="/">
                <h1 className="text-2xl font-bold text-gray-900">TIO</h1>
              </Link>
              <nav className="hidden lg:flex items-center gap-5">
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
                        className={getLinkClassName(
                          "text-sm transition-colors",
                          "font-bold text-gray-900",
                          "font-medium text-gray-700 hover:text-gray-900",
                          isActive
                        )}
                      >
                        {CATEGORY_LABELS[id as CATEGORY]}
                      </Link>
                    );
                  })}
              </nav>
            </div>
            <div className="flex-grow mx-8">
              <SearchInput />
            </div>
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/story"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-gray-700 hover:text-gray-900"
                  >
                    스토리
                  </Link>
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                  >
                    <User className="w-4 h-4" />
                    로그인
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href="/closet"
                    className={getLinkClassName(
                      "transition-colors",
                      "font-bold text-gray-900",
                      "text-gray-700 hover:text-gray-900",
                      pathname.startsWith("/closet")
                    )}
                  >
                    옷장
                  </Link>
                  <Link
                    href="/cart"
                    className={getLinkClassName(
                      "transition-colors",
                      "font-bold text-gray-900",
                      "text-gray-700 hover:text-gray-900",
                      pathname.startsWith("/cart")
                    )}
                  >
                    장바구니
                  </Link>
                  <Link
                    href="/mypage"
                    onClick={handleMypageClick}
                    className="relative"
                  >
                    <User className="w-4 h-4" />
                    {showDesktopNotification && (
                      <>
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                      </>
                    )}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* --- Mobile Header --- */}
          <div className="flex md:hidden items-center gap-2 py-3">
            <Link href="/">
              <h1 className="text-xl font-bold text-gray-900">TIO</h1>
            </Link>
            <div className="flex-grow min-w-0">
              <SearchInput />
            </div>
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
            <button onClick={toggleMenu} className="relative">
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="fixed top-0 left-0 w-full h-screen bg-white z-[9999] overflow-y-auto">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                  <Link href="/">
                    <h1 className="text-xl font-bold text-gray-900">TIO</h1>
                  </Link>
                  <div className="flex-grow min-w-0">
                    <SearchInput onSearch={() => setMenuOpen(false)} />
                  </div>
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
                  <button onClick={toggleMenu}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
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
                    ) : avatarInfo.products &&
                      avatarInfo.products.length > 0 ? (
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
        </div>
      </header>

      {isResultModalOpen && <TryOnResultModal onClose={closeResultModal} />}
    </>
  );
}
