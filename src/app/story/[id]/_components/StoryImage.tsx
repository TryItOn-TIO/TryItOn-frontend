import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { StoryResponse } from "@/types/story";
import CommentSection from "./comment/CommentSection";

type StoryImageProps = {
  currentStory: StoryResponse;
  commentOn: boolean;
  postComment: boolean;
  commentPosition: { x: number; y: number } | null;
  isCommentFormActive: boolean;
  onImageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onCancelComment: () => void;
  onChangePosition: () => void;
};

const StoryImage = forwardRef<HTMLDivElement, StoryImageProps>(
  (
    {
      currentStory,
      commentOn,
      postComment,
      commentPosition,
      isCommentFormActive,
      onImageClick,
      onCancelComment,
      onChangePosition,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[500px] h-full bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden rounded-lg shadow-xl cursor-pointer"
        onClick={onImageClick}
      >
        <Image
          src={currentStory.storyImageUrl}
          alt="스토리 사진"
          fill
          className="object-contain rounded-lg"
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* 댓글(포스트잇) 섹션 */}
        <CommentSection
          commentOn={commentOn}
          postComment={postComment}
          storyInfo={currentStory}
          commentPosition={commentPosition}
          onCancelComment={onCancelComment}
          onChangePosition={onChangePosition}
        />

        {/* 댓글 모드 안내 */}
        {postComment && !commentPosition && !isCommentFormActive && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm animate-pulse">
            📍 댓글을 달고 싶은 곳을 클릭해주세요
          </div>
        )}

        {/* ESC 키 안내 - 댓글 입력창이 활성화된 경우 고정 위치에 표시 */}
        {postComment && isCommentFormActive && (
          <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span>⌨️</span>
              <span>ESC 키로 취소</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default StoryImage;
