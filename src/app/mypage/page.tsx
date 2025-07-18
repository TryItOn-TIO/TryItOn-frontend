"use client";

import { User, ChevronRight, LogOut } from "lucide-react";
import { useProfile } from "@/hooks/useMypage";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { clearSessionStorage, deleteAccessToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useAvatarStore } from "@/stores/avatar-store";
import { useEffect } from "react";
import { fetchLatestAvatarInfo } from "@/api/avatar";
import AvatarFace from "@/components/common/AvatarFace";

interface MenuSectionProps {
  title: string;
  items: Array<{
    label: string;
    href: string;
    subtitle?: boolean;
  }>;
}

function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {title && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="divide-y divide-gray-100">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div>
              <span className="text-gray-900">{item.label}</span>
              {item.subtitle && (
                <p className="text-sm text-gray-500 mt-1">
                  체형, 취향 정보 업데이트 추천하기
                </p>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function MyPage() {
  useAuthGuard();

  const { profile, isLoading, error } = useProfile();
  const router = useRouter();

  const avatarInfo = useAvatarStore((state) => state.avatarInfo);
  const setAvatarInfo = useAvatarStore((state) => state.setAvatarInfo);

  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        const data = await fetchLatestAvatarInfo();
        setAvatarInfo(data);
        console.log("마이페이지 - 아바타 정보 로드:", data);
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
      }
    };

    loadAvatarInfo();
  }, [setAvatarInfo]);

  const handleLogout = () => {
    const confirmLogout = confirm("정말 로그아웃 하시겠습니까?");

    if (confirmLogout) {
      deleteAccessToken();
      clearSessionStorage();

      router.push("/");
      alert("로그아웃되었습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
        <div className="text-lg text-gray-600">프로필을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
        <div className="text-lg text-red-600">오류: {error}</div>
      </div>
    );
  }

  // 백엔드 API에서 받은 loginType 사용
  const isGoogleLogin = profile?.loginType === "GOOGLE";

  // 내 정보 메뉴 아이템 (구글 로그인 사용자는 비밀번호 변경 제외)
  const myInfoItems = [
    { label: "프로필 관리", href: "/mypage/profile" },
    { label: "아바타 설정", href: "/mypage/settings" },
    // 구글 로그인 사용자가 아닌 경우에만 비밀번호 변경 메뉴 표시
    ...(isGoogleLogin
      ? []
      : [{ label: "비밀번호 변경", href: "/mypage/password" }]),
    { label: "배송지 주소 관리", href: "/mypage/address" },
    { label: "결제 정보", href: "/mypage/payment" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">마이 페이지</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <AvatarFace
              avatarUrl={avatarInfo?.avatarImgUrl}
              username={profile?.username}
              size="md"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {profile?.username || "사용자"}
              </h2>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-600">{profile?.email}</p>
                {isGoogleLogin && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                    Google
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <MenuSection
            title="쇼핑 정보"
            items={[
              { label: "주문 내역", href: "/mypage/orders" },
              { label: "취소/반품/교환 내역", href: "/mypage/returns" },
              { label: "최근 본 상품", href: "/mypage/recent" },
            ]}
          />

          <MenuSection title="내 정보" items={myInfoItems} />

          <MenuSection
            title="나의 맞춤 정보"
            items={[
              {
                label: "체형, 취향 정보 업데이트 추천하기",
                href: "/mypage/preferences",
                subtitle: true,
              },
            ]}
          />

          <MenuSection
            title=""
            items={[
              { label: "고객센터", href: "/support" },
              { label: "이용약관", href: "/terms" },
              { label: "개인정보처리방침", href: "/privacy" },
            ]}
          />

          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-6 py-4 text-red-600 hover:bg-red-50 transition-colors rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-2" />
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
