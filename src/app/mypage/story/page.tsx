"use client";

import { deleteStory, getMyStories } from "@/api/story";
import { StoryResponse } from "@/types/story";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StorySortButtons from "./_components/StorySortButtons";
import MyStoryGrid from "./_components/MyStoryGrid";

const MyStoryPage = () => {
  const router = useRouter();
  const [stories, setStories] = useState<StoryResponse[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const response = await getMyStories();
    setStories(response);
  };

  const handleStoryClick = (id: number) => {
    router.push(`/story/${id}`);
  };

  const handleStoryDelete = async (id: number) => {
    if (window.confirm("정말로 이 스토리를 삭제하시겠습니까?")) {
      const response = await deleteStory(id);
      if (response) {
        alert("스토리가 성공적으로 삭제되었습니다.");
        setStories(stories.filter((story) => story.storyId !== id));
      } else {
        alert("스토리 삭제에 실패했습니다.");
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
  );
};

export default MyStoryPage;
