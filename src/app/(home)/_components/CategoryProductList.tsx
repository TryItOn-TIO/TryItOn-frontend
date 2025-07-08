"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import StoryCard from "@/app/story/_components/StoryCard";
import { dummyStoryList } from "@/mock/story";
import { StoryResponse } from "@/types/story";
import { getStories } from "@/api/story";
import { SortType } from "@/constants/SortType";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

type CategoryProductListProps = {
  categories: Array<{
    categoryId: number;
    categoryName: string;
    products: any[];
  }>;
};

const CategoryProductList = ({ categories }: CategoryProductListProps) => {
  console.log("카테고리별 상품 표시:", categories.length, "개 카테고리");

  const router = useRouter();
  const [stories, setStories] = useState<StoryResponse[]>(dummyStoryList);
  const [isLoading, setIsLoading] = useState<boolean>(true); // TODO: API 테스트 후 true로 변경
  const [error, setError] = useState<string | null>(null);

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      const response = await getStories(SortType.POPULAR, 10);
      setStories(response.stories);
    } catch (err) {
      setError("스토리를 불러오는데 실패했습니다.");
      console.error("스토리 로딩 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoryClick = (storyId: number) => {
    router.push(`/story/${storyId}`);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="space-y-12 py-8 px-4">
      {/* 스토리 영역 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-black">패션 스토리</h3>
        <button
          className="text-sm text-neutral-500 hover:text-black transition-colors"
          onClick={() => router.push("/story")}
        >
          더보기 →
        </button>
      </div>

      {isLoading && <p>스토리를 불러오는 중...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!isLoading && !error && (
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode]}
          className="w-full"
        >
          {stories.map((story) => (
            <SwiperSlide
              key={story.storyId}
              style={{ width: "18rem" }}
              className="flex-shrink-0"
            >
              <StoryCard story={story} onClick={handleStoryClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* 카테고리별 상품 영역 */}
      {categories.map((category) => (
        <section key={category.categoryId}>
          <h3 className="text-xl font-semibold mb-4 text-black">
            {category.categoryName}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
            {(category.products || []).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CategoryProductList;
