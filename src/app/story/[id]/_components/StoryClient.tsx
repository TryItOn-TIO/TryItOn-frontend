"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ClothesInfo from "@/app/story/[id]/_components/ClothesInfo";
import { initialStoriesData, StoryResponse } from "@/types/story";
import MenuBar from "@/app/story/[id]/_components/MenuBar";
import { getNextStories, getStories } from "@/api/story";
import { useRouter } from "next/navigation";
import { useStories } from "@/hooks/useStories";
import NavigateBtn from "@/app/story/[id]/_components/NavigateBtn";
import CommentSection from "@/app/story/[id]/_components/CommentSection";

const StoryClient = ({ storyId }: { storyId: number }) => {
  const router = useRouter();
  // TODO: API 연결 테스트 후, 아래 코드로 바꿔껴야 합니다.
  // const { stories: data, setStories: setData } = useStories();
  const [data, setData] = useState<StoryResponse[]>(initialStoriesData);

  const currentStory = data.find((story) => story.id == storyId);

  // 포스트잇 추가 상태 관리
  const [postComment, setPostComment] = useState(true);
  // 댓글 on/off 상태 관리
  const [commentOn, setCommentOn] = useState(false);
  // 착장 정보 on/off 상태 관리
  const [clothesOn, setClothesOn] = useState(false);

  const handleLike = () => {
    // TODO: 스토리 like API
    setData((prevData) =>
      prevData.map((story) =>
        story.id === storyId ? { ...story, liked: !story.liked } : story
      )
    );
  };

  const handleNext = () => {
    const nextIndex = data.findIndex((story) => story.id == storyId) + 1;
    if (nextIndex < data.length) {
      router.push(`/story/${data[nextIndex].id}`);
    }
  };

  const handlePrev = () => {
    const prevIndex = data.findIndex((story) => story.id == storyId) - 1;
    if (prevIndex >= 0) {
      router.push(`/story/${data[prevIndex].id}`);
    }
  };

  // 최초 스토리 데이터 get 요청
  const fetchData = async () => {
    try {
      const response = await getStories();
      setData(response);
    } catch (error) {
      console.error("스토리를 불러오는 중 에러 발생", error);
    }
  };

  // 이후 스토리 데이터 get 요청
  const fetchNextData = async () => {
    try {
      const response = await getNextStories(storyId);
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
