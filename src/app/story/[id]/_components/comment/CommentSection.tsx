"use client";

import { StoryResponse } from "@/types/story";
import React, { useState } from "react";
import Comment from "@/app/story/[id]/_components/comment/Comment";
import PositionCommentForm from "@/app/story/[id]/_components/comment/PositionCommentForm";
import { createComment } from "@/api/comment";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

type CommentSectionProps = {
  commentOn: boolean;
  postComment: boolean;
  storyInfo: StoryResponse;
  commentPosition: { x: number; y: number } | null;
  onCancelComment: () => void;
  onChangePosition: () => void;
};

const CommentSection = ({
  commentOn,
  postComment,
  storyInfo,
  commentPosition,
  onCancelComment,
  onChangePosition,
}: CommentSectionProps) => {
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (value: string) => {
    setComment(value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      openAlert({
        title: "댓글 입력",
        message: "댓글을 입력해주세요",
        confirmText: "확인",
        cancelText: "취소",
        type: "error",
      });
      return;
    }

    if (!commentPosition) {
      openAlert({
        title: "댓글 위치 선택",
        message: "댓글 위치를 선택해주세요",
        confirmText: "확인",
        cancelText: "취소",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createComment(storyInfo.storyId, {
        contents: comment,
        position: { x: commentPosition.x, y: commentPosition.y },
      });

      setComment(""); // 성공 시 입력창 초기화
      onCancelComment(); // 댓글 입력 모드 종료
      window.location.reload();
    } catch (error) {
      console.error("댓글 전송 실패", error);
      openAlert({
        title: "알림",
        message: "댓글 등록 중 문제가 발생했습니다.",
        confirmText: "확인",
        cancelText: "취소",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* 댓글 포스트잇 */}
      {commentOn &&
        storyInfo.comments.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}

      {/* 좌표 기반 댓글 입력창 */}
      {postComment && commentPosition && (
        <PositionCommentForm
          position={commentPosition}
          comment={comment}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={onCancelComment}
          onChangePosition={onChangePosition}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default CommentSection;
