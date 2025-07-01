"use client";

import React, { useEffect, useState } from "react";
import Comment from "./_components/Comment";
import Image from "next/image";
import CommentForm from "@/components/forms/CommentForm";
import ClothesInfo from "./_components/ClothesInfo";
import { StoryResponse } from "@/types/story";
import { dummyStories } from "@/mock/story";
import MenuBar from "./_components/MenuBar";
import { getNextStories, getStories } from "@/api/story";
import { useParams, useRouter } from "next/navigation";
import { useStories } from "@/hooks/useStories";

const Story = () => {
  const params = useParams();
  const router = useRouter();
  // TODO: API 연결 테스트 후, 아래 코드로 바꿔껴야 합니다.
  // const { stories: data, setStories: setData } = useStories();
  const [data, setData] = useState<StoryResponse[]>(dummyStories);
  const storyId = Number(params?.id);

  const currentStory = data.find((story) => story.id == storyId);

  // 포스트잇 추가 상태 관리
  const [postComment, setPostComment] = useState(true);
  // 댓글 on/off 상태 관리
  const [commentOn, setCommentOn] = useState(true);
  // 착장 정보 on/off 상태 관리
  const [clothesOn, setClothesOn] = useState(true);

  const handleLike = () => {
    // TODO: 스토리 like API
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

            {/* 댓글 포스트잇 */}
            {commentOn &&
              currentStory.comments.map((comment) => (
                <Comment key={comment.id} data={comment} />
              ))}

            {/* 댓글 입력창 */}
            {postComment && (
              <div className="absolute bottom-0 left-0 w-full z-10">
                <CommentForm />
              </div>
            )}

            {/* 메뉴바 */}
            <div className="absolute right-4 bottom-18">
              <MenuBar
                liked={currentStory.liked}
                onLike={handleLike}
                commentOn={commentOn}
                setCommentOn={setCommentOn}
                clothesOn={clothesOn}
                setClothesOn={setClothesOn}
              />
            </div>

            {/* 스토리 전환 버튼 (예시용) */}
            <div
              className="absolute top-1/2 left-2 text-white text-2xl"
              onClick={handlePrev}
            >
              ↑
            </div>
            <div
              className="absolute top-1/2 right-2 text-white text-2xl"
              onClick={handleNext}
            >
              ↓
            </div>
          </div>

          {/* 착장 정보 */}
          {clothesOn && <ClothesInfo data={currentStory.proucts} />}
        </div>
      )}
    </>
  );
};

export default Story;
