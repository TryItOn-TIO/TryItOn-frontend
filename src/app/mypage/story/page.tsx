"use client";

import { deleteStory, getMyStories } from "@/api/story";
import { StoryResponse } from "@/types/story";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StorySortButtons from "./_components/StorySortButtons";
import MyStoryGrid from "./_components/MyStoryGrid";
import Spinner from "@/components/common/Spinner";
import CustomAlert from "@/components/ui/CustomAlert";
import { useCustomAlert } from "@/hooks/useCustomAlert";

const MyStoryPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stories, setStories] = useState<StoryResponse[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      const response = await getMyStories();
      setStories(response);
    } catch (error) {
      console.error("스토리 로드 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoryClick = (id: number) => {
    router.push(`/story/${id}`);
  };

  const handleStoryDelete = async (id: number) => {
    const confirmDelete = await openAlert({
      title: "스토리 삭제",
      message: "정말로 이 스토리를 삭제하시겠습니까?",
      type: "warning",
      confirmText: "삭제",
      cancelText: "취소"
    });

    if (confirmDelete) {
      const response = await deleteStory(id);
      if (response) {
        openAlert({
          title: "성공",
          message: "스토리가 성공적으로 삭제되었습니다.",
          type: "success"
        });
        setStories(stories.filter((story) => story.storyId !== id));
      } else {
        openAlert({
          title: "오류",
          message: "스토리 삭제에 실패했습니다.",
          type: "error"
        });
      }
    }
  };

  const handleSort = (order: "newest" | "oldest") => {
    setSortOrder(order);
    const sortedStories = [...stories].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
    setStories(sortedStories);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center w-full min-h-screen px-4 py-8">
          <div className="w-full max-w-6xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              나의 스토리
            </h1>
            <StorySortButtons sortOrder={sortOrder} onSort={handleSort} />
            <MyStoryGrid
              stories={stories}
              onStoryClick={handleStoryClick}
              onStoryDelete={handleStoryDelete}
            />
          </div>
        </div>
      )}
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />
    </>
  );
};

export default MyStoryPage;
