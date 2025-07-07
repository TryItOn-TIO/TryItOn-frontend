"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useMypage";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { ProfileUpdateRequest } from "@/types/mypage";

export default function ProfilePage() {
  useAuthGuard();
  const router = useRouter();
  const { profile, isLoading, error, updateProfile } = useProfile();

  const [formData, setFormData] = useState<ProfileUpdateRequest>({
    username: "",
    height: 0,
    weight: 0,
    shoeSize: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 프로필 데이터가 로드되면 폼 데이터 초기화
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        height: profile.height,
        weight: profile.weight,
        shoeSize: profile.shoeSize,
      });
    }
  }, [profile]);

  const handleInputChange = (
    field: keyof ProfileUpdateRequest,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await updateProfile(formData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "프로필 수정에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 w-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">프로필 관리</h1>
        </div>

        {/* 프로필 폼 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 (읽기 전용) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                이메일은 변경할 수 없습니다.
              </p>
            </div>

            {/* 사용자명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사용자명 *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="사용자명을 입력하세요"
              />
            </div>

            {/* 신장 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                신장 (cm) *
              </label>
              <input
                type="number"
                value={formData.height || ""}
                onChange={(e) =>
                  handleInputChange("height", parseInt(e.target.value) || 0)
                }
                required
                min="100"
                max="250"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="신장을 입력하세요 (예: 175)"
              />
            </div>

            {/* 체중 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                체중 (kg) *
              </label>
              <input
                type="number"
                value={formData.weight || ""}
                onChange={(e) =>
                  handleInputChange("weight", parseInt(e.target.value) || 0)
                }
                required
                min="30"
                max="200"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="체중을 입력하세요 (예: 70)"
              />
            </div>

            {/* 신발 사이즈 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                신발 사이즈 (mm) *
              </label>
              <input
                type="number"
                value={formData.shoeSize || ""}
                onChange={(e) =>
                  handleInputChange("shoeSize", parseInt(e.target.value) || 0)
                }
                required
                min="200"
                max="350"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="신발 사이즈를 입력하세요 (예: 260)"
              />
            </div>

            {/* 에러 메시지 */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            )}

            {/* 성공 메시지 */}
            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-600 text-sm">
                  프로필이 성공적으로 수정되었습니다!
                </p>
              </div>
            )}

            {/* 저장 버튼 */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
