"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useProfile } from "@/hooks/useMypage";
import { checkPasswordChangeable, changePassword } from "@/api/password";

interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordChangePage() {
  useAuthGuard();
  const router = useRouter();
  const { profile } = useProfile();

  const [formData, setFormData] = useState<PasswordChangeForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [canChangePassword, setCanChangePassword] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // 비밀번호 변경 가능 여부 확인
  useEffect(() => {
    const checkChangeable = async () => {
      try {
        const result = await checkPasswordChangeable();
        setCanChangePassword(result.canChange);
      } catch (error) {
        console.error("비밀번호 변경 가능 여부 확인 실패:", error);
        setCanChangePassword(false);
      }
    };

    checkChangeable();
  }, []);

  // 비밀번호 유효성 검사
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push("비밀번호는 최소 8자 이상이어야 합니다.");
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("소문자를 포함해야 합니다.");
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("대문자를 포함해야 합니다.");
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push("숫자를 포함해야 합니다.");
    }
    
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push("특수문자(!@#$%^&*)를 포함해야 합니다.");
    }

    return errors;
  };

  const handleInputChange = (field: keyof PasswordChangeForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
    setSuccess(false);

    // 새 비밀번호 유효성 검사
    if (field === 'newPassword') {
      const errors = validatePassword(value);
      setValidationErrors(errors);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 클라이언트 사이드 유효성 검사
    if (formData.newPassword !== formData.confirmPassword) {
      setError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      setIsSubmitting(false);
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("현재 비밀번호와 새 비밀번호가 동일합니다.");
      setIsSubmitting(false);
      return;
    }

    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      setError("새 비밀번호가 요구사항을 만족하지 않습니다.");
      setIsSubmitting(false);
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // 3초 후 마이페이지로 이동
      setTimeout(() => {
        router.push('/mypage');
      }, 3000);

    } catch (error: any) {
      setError(error.message || "비밀번호 변경에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 소셜 로그인 사용자인 경우
  if (canChangePassword === false) {
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
              <Lock className="w-6 h-6 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">비밀번호 변경</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                비밀번호 변경 불가
              </h2>
              <p className="text-gray-600 mb-4">
                소셜 로그인으로 가입한 계정은 비밀번호를 변경할 수 없습니다.
              </p>
              <p className="text-sm text-gray-500">
                Google 계정의 비밀번호는 Google에서 직접 변경해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 로딩 중
  if (canChangePassword === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
        <div className="text-lg text-gray-600">확인 중...</div>
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
          <div className="flex items-center">
            <Lock className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">비밀번호 변경</h1>
          </div>
        </div>

        {/* 성공 메시지 */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  비밀번호가 성공적으로 변경되었습니다!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  잠시 후 마이페이지로 이동합니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 비밀번호 변경 폼 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">새 비밀번호 설정</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 현재 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재 비밀번호 *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="현재 비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* 새 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                새 비밀번호 *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange("newPassword", e.target.value)}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="새 비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* 비밀번호 요구사항 */}
              <div className="mt-2 text-xs text-gray-500">
                <p className="mb-1">비밀번호는 다음 조건을 만족해야 합니다:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li className={formData.newPassword.length >= 8 ? "text-green-600" : ""}>
                    최소 8자 이상
                  </li>
                  <li className={/(?=.*[a-z])/.test(formData.newPassword) ? "text-green-600" : ""}>
                    소문자 포함
                  </li>
                  <li className={/(?=.*[A-Z])/.test(formData.newPassword) ? "text-green-600" : ""}>
                    대문자 포함
                  </li>
                  <li className={/(?=.*\d)/.test(formData.newPassword) ? "text-green-600" : ""}>
                    숫자 포함
                  </li>
                  <li className={/(?=.*[!@#$%^&*])/.test(formData.newPassword) ? "text-green-600" : ""}>
                    특수문자(!@#$%^&*) 포함
                  </li>
                </ul>
              </div>

              {/* 유효성 검사 오류 */}
              {validationErrors.length > 0 && formData.newPassword && (
                <div className="mt-2 text-xs text-red-600">
                  {validationErrors.map((error, index) => (
                    <p key={index}>• {error}</p>
                  ))}
                </div>
              )}
            </div>

            {/* 새 비밀번호 확인 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                새 비밀번호 확인 *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="새 비밀번호를 다시 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* 비밀번호 일치 확인 */}
              {formData.confirmPassword && (
                <p className={`mt-1 text-xs ${
                  formData.newPassword === formData.confirmPassword 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {formData.newPassword === formData.confirmPassword 
                    ? "✓ 비밀번호가 일치합니다" 
                    : "✗ 비밀번호가 일치하지 않습니다"
                  }
                </p>
              )}
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* 변경 버튼 */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting || validationErrors.length > 0 || formData.newPassword !== formData.confirmPassword}
                className="flex items-center px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4 mr-2" />
                {isSubmitting ? "변경 중..." : "비밀번호 변경"}
              </button>
            </div>
          </form>
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
                비밀번호 변경 시 주의사항
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>비밀번호 변경 후 모든 기기에서 다시 로그인해야 합니다.</li>
                  <li>안전한 비밀번호를 사용하여 계정을 보호하세요.</li>
                  <li>비밀번호는 정기적으로 변경하는 것을 권장합니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
