"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { getAccessToken } from "@/utils/auth";
import { useTryOnStore } from "@/stores/try-on-store";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import TryOnResultModal from "../ui/TryOnResultModal";

// Dynamically import components
const SearchInput = dynamic(() => import("@/components/common/SearchInput"), {
  ssr: false,
});

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const { viewNotification } = useTryOnStore();

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);
  }, []);

  const openResultModal = () => {
    setIsResultModalOpen(true);
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
    viewNotification(); // 모달 닫을 때 알림 읽음 처리
  };

  if (isLoggedIn === null) return null;

  return (
    <>
      <header className="h-16 sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="h-full max-w-[1440px] mx-auto px-4">
          {/* Desktop Header */}
          <DesktopHeader
            pathname={pathname}
            isLoggedIn={isLoggedIn}
            openResultModal={openResultModal}
            SearchInput={SearchInput}
          />

          {/* Mobile Header */}
          <MobileHeader
            pathname={pathname}
            isLoggedIn={isLoggedIn}
            openResultModal={openResultModal}
            SearchInput={SearchInput}
          />
        </div>
      </header>

      {isResultModalOpen && (
        <div className="z-50">
          <TryOnResultModal onClose={closeResultModal} />
        </div>
      )}
    </>
  );
}
