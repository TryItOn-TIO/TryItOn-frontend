"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { CATEGORY, CATEGORY_LABELS } from "@/constants/category";
import { useAvatarStore } from "@/stores/avatar-store";
import { useTryOnStore } from "@/stores/try-on-store";
import Image from "next/image";

interface DesktopHeaderProps {
  pathname: string;
  isLoggedIn: boolean;
  openResultModal: () => void;
  SearchInput: React.ComponentType<any>;
}

export default function DesktopHeader({
  pathname,
  isLoggedIn,
  openResultModal,
  SearchInput,
}: DesktopHeaderProps) {
  const avatarInfo = useAvatarStore((state) => state.avatarInfo);
  const { status, notificationViewed } = useTryOnStore();

  // --- 알림 로직 ---
  const hasUnreadNotification =
    (status === "success" || status === "error") && !notificationViewed;
  const showDesktopNotification = hasUnreadNotification;
  // ---------------------

  const getLinkClassName = (
    base: string,
    active: string,
    inactive: string,
    isActive: boolean
  ) => [base, isActive ? active : inactive].join(" ");

  return (
    <div className="hidden md:flex items-center justify-between py-4">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900">TIO</h1>
        </Link>
        <nav className="flex items-center gap-5">
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
              className={getLinkClassName(
                "transition-colors",
                "font-bold text-gray-900",
                "text-sm text-gray-700 hover:text-gray-900",
                pathname.startsWith("/story")
              )}
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
              {showDesktopNotification && (
                <>
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                </>
              )}
            </button>
            <Link
              href="/story"
              className={getLinkClassName(
                "transition-colors",
                "font-bold text-gray-900",
                "text-gray-700 hover:text-gray-900",
                pathname.startsWith("/story")
              )}
            >
              스토리
            </Link>
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
            <Link href="/mypage" className="relative">
              <User className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
