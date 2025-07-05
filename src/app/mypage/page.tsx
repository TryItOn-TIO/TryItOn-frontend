"use client";

import { User, ChevronRight } from "lucide-react";
import { useProfile } from "@/hooks/useMypage";
import { useAuthGuard } from "@/hooks/useAuthGuard";

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
  useAuthGuard(); // 인증 확인
  
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">프로필을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 페이지 제목 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">마이 페이지</h1>

        {/* 프로필 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {profile?.username || '사용자'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {profile?.email}
              </p>
              <button className="text-blue-600 text-sm hover:underline flex items-center mt-1">
                등급 혜택 보러가기
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* 메뉴 섹션들 */}
        <div className="space-y-6">
          {/* 쇼핑 정보 */}
          <MenuSection
            title="쇼핑 정보"
            items={[
              { label: "주문 내역", href: "/mypage/orders" },
              { label: "취소/반품/교환 내역", href: "/mypage/returns" },
              { label: "최근 본 상품", href: "/mypage/recent" },
            ]}
          />

          {/* 내 정보 */}
          <MenuSection
            title="내 정보"
            items={[
              { label: "프로필 관리", href: "/mypage/profile" },
              { label: "비밀번호 변경", href: "/mypage/password" },
              { label: "배송지 주소 관리", href: "/mypage/address" },
              { label: "결제 정보", href: "/mypage/payment" },
            ]}
          />

          {/* 나의 맞춤 정보 */}
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

          {/* 기타 메뉴 */}
          <MenuSection
            title=""
            items={[
              { label: "고객센터", href: "/support" },
              { label: "1:1 문의 내역", href: "/mypage/inquiries" },
              { label: "상품 문의 내역", href: "/mypage/product-inquiries" },
              { label: "공지사항", href: "/notices" },
            ]}
          />
        </div>

        {/* 로그아웃 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="text-gray-600 hover:text-gray-800 text-sm">로그아웃</button>
        </div>
      </div>
    </div>
  );
}
