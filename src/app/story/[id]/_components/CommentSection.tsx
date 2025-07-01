"use client";

import { StoryResponse } from "@/types/story";
import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "@/components/forms/CommentForm";

type CommentSectionProps = {
  commentOn: boolean;
  postComment: boolean;
  storyInfo: StoryResponse;
};

const CommentSection = ({
  commentOn,
  postComment,
  storyInfo,
}: CommentSectionProps) => {
  const [comment, setComment] = useState("");
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (value: string) => {
    setComment(value);
  };

  // TODO: 댓글 post 요청
  const handleSubmit = () => {
    if (!comment.trim()) {
      alert("댓글을 입력해주세요");
      return;
    }

    setIsSubmitting(true);
    try {
      // await postComment({ comment });
      console.log("댓글 전송됨:", comment);
      setComment(""); // 성공 시 입력창 초기화
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

      {/* 댓글 입력창 */}
      {postComment && (
        <div className="absolute bottom-0 left-0 w-full z-10">
          <CommentForm
            comment={comment}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
