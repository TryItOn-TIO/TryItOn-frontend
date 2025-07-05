"use client";

import { StoryResponse } from "@/types/story";
import React, { useState } from "react";
import Comment from "@/app/story/[id]/_components/comment/Comment";
import PositionCommentForm from "@/app/story/[id]/_components/comment/PositionCommentForm";

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
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (value: string) => {
    setComment(value);
  };

  // TODO: 댓글 post 요청
  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert("댓글을 입력해주세요");
      return;
    }

    if (!commentPosition) {
      alert("댓글 위치를 선택해주세요");
      return;
    }

    setIsSubmitting(true);
    try {
      // await postComment({
      //   comment,
      //   position: { x: commentPosition.x, y: commentPosition.y }
      // });
      console.log("댓글 전송됨:", {
        comment,
        position: commentPosition,
      });
      setComment(""); // 성공 시 입력창 초기화
      onCancelComment(); // 댓글 입력 모드 종료
    } catch (error) {
      console.error("댓글 전송 실패", error);
      alert("댓글 등록 중 문제가 발생했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default CommentSection;
