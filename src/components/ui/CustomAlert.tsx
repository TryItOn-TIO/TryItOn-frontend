"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface CustomAlertProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  type?: "info" | "success" | "warning" | "error";
}

export default function CustomAlert({
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  isOpen,
  type = "info",
}: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  // Alert 타입에 따른 스타일 설정
  const alertStyles = {
    info: {
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      iconColor: "text-gray-500",
      iconBg: "bg-gray-100",
    },
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    warning: {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-100",
    },
    error: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-500",
      iconBg: "bg-red-100",
    },
  };

  const { bgColor, borderColor, iconColor, iconBg } = alertStyles[type];

  // 애니메이션을 위한 상태 관리
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      // 포커스를 확인 버튼으로 이동
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 10);
    } else {
      document.body.style.overflow = "";
      setIsVisible(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC와 ENTER 키 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        if (onCancel) onCancel();
      } else if (e.key === "Enter") {
        e.preventDefault();
        onConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onConfirm, onCancel]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (alertRef.current && !alertRef.current.contains(e.target as Node)) {
        if (onCancel) onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onCancel]);

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={alertRef}
        className={`w-full max-w-sm rounded-lg border ${borderColor} ${bgColor} p-4 shadow-lg transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex items-start">
          {/* 타입에 따른 아이콘 */}
          <div
            className={`mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconBg}`}
          >
            {type === "info" && (
              <svg
                className={`h-5 w-5 ${iconColor}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {type === "success" && (
              <svg
                className={`h-5 w-5 ${iconColor}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {type === "warning" && (
              <svg
                className={`h-5 w-5 ${iconColor}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {type === "error" && (
              <svg
                className={`h-5 w-5 ${iconColor}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          <div className="flex-1">
            {/* 닫기 버튼 */}
            {onCancel && (
              <button
                type="button"
                className="float-right ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                onClick={onCancel}
                aria-label="닫기"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* 제목 */}
            {title && (
              <h3 className="mb-1 text-lg font-medium text-gray-900">
                {title}
              </h3>
            )}

            {/* 메시지 */}
            <div className="mb-4 text-sm text-gray-700">{message}</div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-2">
              {onCancel && (
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={onCancel}
                >
                  {cancelText}
                </button>
              )}
              <button
                ref={confirmButtonRef}
                type="button"
                className={`rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === "error"
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    : type === "warning"
                    ? "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
                    : type === "success"
                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
                }`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
