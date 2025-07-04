"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ClothesInfo from "@/app/story/[id]/_components/ClothesInfo";
import { initialStoriesData, StoriesResponse } from "@/types/story";
import MenuBar from "@/app/story/[id]/_components/MenuBar";
import { getNextStories, getStories, toggleStoryLike } from "@/api/story";
import { useRouter } from "next/navigation";
import { useStories } from "@/hooks/useStories";
import NavigateBtn from "@/app/story/[id]/_components/NavigateBtn";
import CommentSection from "@/app/story/[id]/_components/CommentSection";
import { SortType } from "@/constants/SortType";

const StoryClient = ({ storyId }: { storyId: number }) => {
  const router = useRouter();
  // TODO: API 연결 테스트 후, 아래 코드로 바꿔껴야 합니다.
  // const { stories: data, setStories: setData } = useStories();
  const [data, setData] = useState<StoriesResponse>(initialStoriesData);

  const currentStory = data.stories.find((story) => story.storyId == storyId);

  // 포스트잇 추가 상태 관리
  const [postComment, setPostComment] = useState(true);
  // 댓글 on/off 상태 관리
  const [commentOn, setCommentOn] = useState(false);
  // 착장 정보 on/off 상태 관리
  const [clothesOn, setClothesOn] = useState(false);

  const handleLike = async () => {
    try {
      await toggleStoryLike(storyId);
      window.location.reload(); // 좋아요 fetch
    } catch {
      console.error("좋아요를 누르는 과정에서 에러가 발생했습니다.");
    }
  };

  const handleNext = () => {
    const nextIndex =
      data.stories.findIndex((story) => story.storyId == storyId) + 1;
    if (nextIndex < data.length) {
      router.push(`/story/${data.stories[nextIndex].storyId}`);
    }
  };

  const handlePrev = () => {
    const prevIndex =
      data.stories.findIndex((story) => story.storyId == storyId) - 1;
    if (prevIndex >= 0) {
      router.push(`/story/${data.stories[prevIndex].storyId}`);
    }
  };

  // 최초 스토리 데이터 get 요청
  const fetchData = async () => {
    try {
      const response = await getStories(SortType.LATEST, 10);
      setData(response);
    } catch (error) {
      console.error("스토리를 불러오는 중 에러 발생", error);
    }
  };

  // 이후 스토리 데이터 get 요청
  const fetchNextData = async () => {
    try {
      const response = await getNextStories(storyId, SortType.LATEST, 10);
      setData(response);
    } catch (error) {
      console.error("스토리를 불러오는 중 에러 발생", error);
    }
  };

  // 최초 스토리 10개 요청
  useEffect(() => {
    if (data.length == 0) {
      // fetchData();
    }
  }, []);

  // 마지막 스토리일 때 다음 10개 요청
  useEffect(() => {
    if (storyId == data.length - 1) {
      // fetchNextData();
    }
  }, [storyId]);

  return (
    <>
      {currentStory && (
        <div className="w-screen h-[90vh] fixed top-[10vh] left-0 flex justify-center gap-20 items-center z-40 bg-white">
          <div className="relative w-full max-w-[500px] h-full bg-gray-100 overflow-hidden">
            {/* 이미지 */}
            <Image
              src="/images/dummy/ex10.png"
              alt="스토리 사진"
              fill
              className="object-contain"
            />

            {/* 댓글(포스트잇) 섹션 */}
            <CommentSection
              commentOn={commentOn}
              postComment={postComment}
              storyInfo={currentStory}
            />

            {/* 메뉴바 */}
            <div className="absolute left-4 bottom-18">
              <MenuBar
                liked={currentStory.liked}
                onLike={handleLike}
                commentOn={commentOn}
                setCommentOn={setCommentOn}
                clothesOn={clothesOn}
                setClothesOn={setClothesOn}
              />
            </div>

            {/* 스토리 전환 버튼 */}
            <div className="space-y-10 absolute top-2/5 right-0">
              <NavigateBtn onNextPage={handleNext} onPrevPage={handlePrev} />
            </div>
          </div>

          {/* 착장 정보 */}
          {clothesOn && <ClothesInfo data={currentStory.proucts} />}
        </div>
      )}
    </>
  );
};

export default StoryClient;
