"use client";

import { useEffect } from "react";
import { ChevronLeft, Settings, User, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useMypage";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AvatarImageUpdater from "@/components/avatar/AvatarImageUpdater";
import { useAvatarStore } from "@/stores/avatar-store";
import { fetchLatestAvatarInfo } from "@/api/avatar";
import AvatarFace from "@/components/common/AvatarFace";

export default function SettingsPage() {
  useAuthGuard();
  const router = useRouter();
  const { profile, isLoading, error, refetch } = useProfile();
  
  const avatarInfo = useAvatarStore((state) => state.avatarInfo);
  const setAvatarInfo = useAvatarStore((state) => state.setAvatarInfo);

  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        const data = await fetchLatestAvatarInfo();
        setAvatarInfo(data);
        console.log('설정 페이지 - 아바타 정보 로드:', data);
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
      }
    };

    loadAvatarInfo();
  }, [setAvatarInfo]);

  const handleAvatarUpdateSuccess = (newAvatarUrl: string) => {
    refetch?.();
    const loadAvatarInfo = async () => {
      try {
        const data = await fetchLatestAvatarInfo();
        setAvatarInfo(data);
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
      }
    };
    loadAvatarInfo();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
        <div className="text-lg text-gray-600">설정을 불러오는 중...</div>
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

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">설정</h1>
          </div>
        </div>

        {/* 프로필 정보 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <AvatarFace
              avatarUrl={avatarInfo?.avatarImgUrl}
              username={profile?.username}
              size="md"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {profile?.username || "사용자"}
              </h2>
              <p className="text-sm text-gray-600">{profile?.email}</p>
            </div>
          </div>
        </div>

        {/* 아바타 이미지 변경 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <Camera className="w-5 h-5 mr-2 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">아바타 이미지 변경</h2>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-4">
              가상 피팅에 사용될 아바타 이미지를 변경할 수 있습니다.
            </p>
            
            {/* 현재 아바타 미리보기 */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {avatarInfo?.avatarImgUrl ? (
                  <img
                    src={avatarInfo.avatarImgUrl}
                    alt="현재 아바타"
                    className="w-[400px] h-[400px] object-contain rounded-lg border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-[400px] h-[400px] bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            
            <AvatarImageUpdater
              currentAvatarUrl={avatarInfo?.avatarImgUrl}
              onUpdateSuccess={handleAvatarUpdateSuccess}
            />
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                아바타 이미지 변경 시 주의사항
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>아바타 이미지를 변경하면 기존 가상 피팅 결과가 초기화됩니다.</li>
                  <li>새로운 아바타로 다시 가상 피팅을 진행해야 합니다.</li>
                  <li>권장 이미지 크기: 512x512 픽셀</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
