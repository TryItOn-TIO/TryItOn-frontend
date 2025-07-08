import React, { useState, useRef } from "react";

const useCommentInteraction = () => {
  const storyImageRef = useRef<HTMLDivElement>(null);

  // 포스트잇 추가 상태 관리
  const [postComment, setPostComment] = useState(false);
  // 댓글 on/off 상태 관리
  const [commentOn, setCommentOn] = useState(false);
  // 착장 정보 on/off 상태 관리
  const [clothesOn, setClothesOn] = useState(false);
  // 댓글 입력 위치 상태
  const [commentPosition, setCommentPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  // 댓글 입력창이 활성화된 상태
  const [isCommentFormActive, setIsCommentFormActive] = useState(false);

  // 스토리 이미지 클릭 시 댓글 입력 위치 설정
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 댓글 작성 모드가 아니거나 이미 댓글 입력창이 활성화된 경우 무시
    if (!postComment || isCommentFormActive) return;

    const rect = storyImageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCommentPosition({ x, y });
    setIsCommentFormActive(true);
  };

  // 댓글 입력 취소
  const handleCancelComment = () => {
    setCommentPosition(null);
    setIsCommentFormActive(false);
    setPostComment(false);
  };

  // 댓글 위치 변경
  const handleChangePosition = () => {
    setIsCommentFormActive(false);
    // 잠시 후 다시 클릭할 수 있도록 설정
    setTimeout(() => {
      setCommentPosition(null);
    }, 100);
  };

  return {
    storyImageRef,
    postComment,
    setPostComment,
    commentOn,
    setCommentOn,
    clothesOn,
    setClothesOn,
    commentPosition,
    isCommentFormActive,
    handleImageClick,
    handleCancelComment,
    handleChangePosition,
  };
};

export default useCommentInteraction;
