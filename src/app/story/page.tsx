"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStories } from "@/api/story";
import { StoryResponse } from "@/types/story";
import { SortType } from "@/constants/SortType";
import StoryErrorState from "./_components/StoryErrorState";
import StoryHeader from "./_components/StoryHeader";
import StoryGrid from "./_components/StoryGrid";
import Spinner from "@/components/common/Spinner";

const StoryPage = () => {
  const router = useRouter();
  const [stories, setStories] = useState<StoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>(SortType.POPULAR);

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      const response = await getStories(sortType, 20);
      setStories(response.stories);
    } catch (err) {
      setError("스토리를 불러오는데 실패했습니다.");
      console.error("스토리 로딩 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [sortType]);

  const handleStoryClick = (storyId: number) => {
    router.push(`/story/${storyId}`);
  };

  const handleSortChange = (newSortType: SortType) => {
    setSortType(newSortType);
  };

  if (error) {
    return <StoryErrorState error={error} />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      <div className="flex flex-col items-center w-screen min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <StoryHeader sortType={sortType} onSortChange={handleSortChange} />
          <StoryGrid
            stories={stories}
            onStoryClick={handleStoryClick}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default StoryPage;
