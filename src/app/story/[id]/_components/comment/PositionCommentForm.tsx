"use client";

import React, { useEffect, useRef } from "react";

type PositionCommentFormProps = {
  position: { x: number; y: number };
  comment: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onChangePosition: () => void;
  isSubmitting: boolean;
};

const PositionCommentForm = ({
  position,
  comment,
  onChange,
  onSubmit,
  onCancel,
  onChangePosition,
  isSubmitting,
}: PositionCommentFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 컴포넌트가 마운트되면 자동으로 입력창에 포커스
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  // 스토리 컨테이너 크기 (최대 500px)
  const STORY_MAX_WIDTH = 500;
  const FORM_WIDTH = 320;
  const FORM_HEIGHT = 280;

  // 폼 위치 계산 - 스토리 영역 내에서만 표시되도록
  const calculateFormPosition = () => {
    let left = position.x;
    let top = position.y - 60;

    // 오른쪽 경계 체크
    if (left + FORM_WIDTH > STORY_MAX_WIDTH) {
      left = STORY_MAX_WIDTH - FORM_WIDTH - 10;
    }
    
    // 왼쪽 경계 체크
    if (left < 10) {
      left = 10;
    }

    // 위쪽 경계 체크
    if (top < 10) {
      top = 10;
    }

    // 아래쪽 경계 체크 (스토리 높이를 고려)
    const maxTop = window.innerHeight * 0.9 - FORM_HEIGHT - 20; // 90vh - 폼 높이 - 여백
    if (top > maxTop) {
      top = maxTop;
    }

    return { left, top };
  };

  const formPosition = calculateFormPosition();

  // 위치 표시점의 상대적 위치 계산
  const dotPosition = {
    left: position.x - formPosition.left,
    top: position.y - formPosition.top,
  };

  return (
    <div
      className="absolute z-50 animate-fadeIn"
      style={{
        left: formPosition.left,
        top: formPosition.top,
      }}
    >
      {/* 위치 표시 점 */}
      <div
        className="absolute w-4 h-4 bg-orange-500 rounded-full animate-pulse border-2 border-white shadow-lg"
        style={{
          left: dotPosition.left - 2,
          top: dotPosition.top - 2,
        }}
      />

      {/* 댓글 입력 폼 */}
      <div className="bg-white rounded-xl shadow-2xl border border-orange-200 p-5 w-80 max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <h3 className="text-sm font-semibold text-gray-800">댓글 작성</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none transition-colors"
            type="button"
          >
            ×
          </button>
        </div>

        {/* 위치 정보 및 변경 버튼 */}
        <div className="flex items-center justify-between mb-3 p-2 bg-orange-50 rounded-lg">
          <div className="text-xs text-gray-600">
            📍 위치: ({Math.round(position.x)}, {Math.round(position.y)})
          </div>
          <button
            onClick={onChangePosition}
            className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
            type="button"
          >
            <span>📍</span>
            위치 변경
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            ref={inputRef}
            placeholder="이 위치에 댓글을 남겨보세요..."
            value={comment}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 transition-all"
          />

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="px-5 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PositionCommentForm;
