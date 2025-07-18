"use client";

import React from "react";
import { toggleStoryLike } from "@/api/story";
import StoryImage from "./StoryImage";
import StoryControlBar from "./controller/StoryControlBar";
import ClothesInfo from "./ClothesInfo";
import useStoryData from "../hooks/useStoryData";
import useCommentInteraction from "../hooks/useCommentInteraction";
import useStoryNavigation from "../hooks/useStoryNavigation";

import { useIsMobile } from "@/hooks/useMediaQuery";
import ShowClothesInfoModal from "@/components/ui/ShowClothesInfoModal";

type StoryClientProps = {
  storyId: number;
};

const StoryClient = ({ storyId }: StoryClientProps) => {
  const { data, currentStory } = useStoryData({ storyId });
  const isMobile = useIsMobile(); // 모바일 여부 판단

  const {
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
  } = useCommentInteraction();

  const { handleNext, handlePrev } = useStoryNavigation({ storyId, data });

  const handleLike = async () => {
    try {
      await toggleStoryLike(storyId);
      window.location.reload(); // 좋아요 fetch
    } catch {
      console.error("좋아요를 누르는 과정에서 에러가 발생했습니다.");
    }
  };

  if (!currentStory) {
    return null;
  }

  return (
    <div className="w-screen h-[90vh] fixed top-[10vh] left-0 flex justify-center gap-20 items-center z-5 bg-[rgba(205,205,205,0.25)]">
      <StoryImage
        ref={storyImageRef}
        currentStory={currentStory}
        commentOn={commentOn}
        postComment={postComment}
        commentPosition={commentPosition}
        isCommentFormActive={isCommentFormActive}
        onImageClick={handleImageClick}
        onCancelComment={handleCancelComment}
        onChangePosition={handleChangePosition}
      />

      <StoryControlBar
        liked={currentStory.liked}
        commentOn={commentOn}
        setCommentOn={setCommentOn}
        clothesOn={clothesOn}
        setClothesOn={setClothesOn}
        postComment={postComment}
        setPostComment={setPostComment}
        onLike={handleLike}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* 착장 정보 - 모바일에선 모달로 띄워지게끔*/}
      {clothesOn &&
        (isMobile ? (
          <ShowClothesInfoModal
            data={currentStory.products}
            onClose={() => setClothesOn(false)}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full md:w-auto">
            <ClothesInfo data={currentStory.products} />
          </div>
        ))}
    </div>
  );
};

export default StoryClient;
