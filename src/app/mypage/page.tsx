"use client";

import { ChevronRight, LogOut, UserX } from "lucide-react";
import { useProfile } from "@/hooks/useMypage";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { clearSessionStorage, deleteAccessToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useAvatarStore } from "@/stores/avatar-store";
import { useEffect, useState } from "react";
import { fetchLatestAvatarInfo } from "@/api/avatar";
import { withdraw } from "@/api/auth";
import { WithdrawRequest } from "@/types/auth";
import AvatarFace from "@/components/common/AvatarFace";
import Spinner from "@/components/common/Spinner";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

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
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const avatarInfo = useAvatarStore((state) => state.avatarInfo);
  const setAvatarInfo = useAvatarStore((state) => state.setAvatarInfo);

  // 회원 탈퇴 관련 상태
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);

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

  const handleLogout = async () => {
    openAlert({
      title: "로그아웃 확인",
      message: "정말 로그아웃 하시겠습니까?",
      confirmText: "확인",
      cancelText: "취소",
      type: "info",

      onConfirm: () => {
        deleteAccessToken();
        clearSessionStorage();

        router.push("/");
      },
    });
  };

  // 회원 탈퇴 모달 열기
  const openWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
    setWithdrawError("");
  };

  // 회원 탈퇴 모달 닫기
  const closeWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
    setPassword("");
    setReason("");
    setWithdrawError("");
  };

  // 회원 탈퇴 처리
  const handleWithdraw = async () => {
    try {
      setIsWithdrawLoading(true);
      setWithdrawError("");

      const withdrawData: WithdrawRequest = {
        password: password || undefined,
        reason: reason || undefined,
      };

      const response = await withdraw(withdrawData);

      if (response.success) {
        openAlert({
          title: "회원 탈퇴 완료",
          message: "회원 탈퇴가 완료되었습니다.",
          type: "info",
          onConfirm: () => {
            deleteAccessToken();
            router.push("/");
          },
        });
      } else {
        setWithdrawError(response.message || "회원 탈퇴에 실패했습니다.");
      }
    } catch (err: any) {
      setWithdrawError(
        err.response?.data?.message || "회원 탈퇴 중 오류가 발생했습니다."
      );
    } finally {
      setIsWithdrawLoading(false);
    }
  };

  // 탈퇴 사유 옵션
  const withdrawReasons = [
    "서비스가 기대에 미치지 못함",
    "사용 빈도가 낮음",
    "다른 서비스 이용",
    "개인정보 보호 우려",
    "기타",
  ];

  if (isLoading) {
    return (
      // <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
      //   <div className="text-lg text-gray-600">프로필을 불러오는 중...</div>
      // </div>
      <Spinner />
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
  ];

  return (
    <>
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />
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
              items={[{ label: "주문 내역", href: "/mypage/orders" }]}
            />

            <MenuSection title="내 정보" items={myInfoItems} />

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-6 py-4 text-gray-700 hover:bg-red-50 transition-colors rounded-lg"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  로그아웃
                </button>
              </div>

              {/* 회원 탈퇴 버튼 */}
              <div className="bg-white rounded-lg shadow-sm">
                <button
                  onClick={openWithdrawModal}
                  className="w-full flex items-center justify-center px-6 py-4 text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                >
                  <UserX className="w-5 h-5 mr-2" />
                  회원 탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 모달 */}
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">회원 탈퇴</h2>
              <p className="text-gray-600 mb-6">
                회원 탈퇴 시 모든 개인정보가 삭제되며 복구할 수 없습니다.
                <br /> 정말로 탈퇴하시겠습니까?
              </p>

              {/* 비밀번호 입력 (이메일 로그인 사용자용) */}
              {!isGoogleLogin && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              )}

              {/* 탈퇴 사유 선택 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  탈퇴 사유 (선택사항)
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">선택하세요</option>
                  {withdrawReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* 에러 메시지 */}
              {withdrawError && (
                <div className="mb-4 text-red-500 text-sm">{withdrawError}</div>
              )}

              {/* 버튼 그룹 */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={closeWithdrawModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={isWithdrawLoading}
                >
                  취소
                </button>
                <button
                  onClick={handleWithdraw}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  disabled={isWithdrawLoading}
                >
                  {isWithdrawLoading ? "처리 중..." : "탈퇴하기"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
