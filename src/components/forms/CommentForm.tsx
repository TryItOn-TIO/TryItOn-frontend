"use client";

import React, { useState } from "react";

/*
type CommentFormProps = {
  content: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const CommentForm = ({ content, onChange, onSubmit }: CommentFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  */
const CommentForm = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    // TODO: 댓글 post 요청

    setIsSubmitting(true);

    try {
      // await postComment({ content });
      console.log("댓글 전송됨:", content);
      setContent(""); // 성공 시 입력창 초기화
    } catch (error) {
      console.error("댓글 전송 실패", error);
      alert("댓글 등록 중 문제가 발생했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 py-2 bg-[rgba(255,255,255,0.9)] border-t border-gray-200 z-50">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          className="flex-grow px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
