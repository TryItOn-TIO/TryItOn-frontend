"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import { ProductResponse } from "@/types/product";
import { useRouter } from "next/navigation";
import Spinner from "@/components/common/Spinner";
import { StoryResponse } from "@/types/story";
import { getStories } from "@/api/story";
import { SortType } from "@/constants/SortType";
import StoryCard from "@/app/story/_components/StoryCard";

type MainProductListProps = {
  recommended: ProductResponse[];
  ranked: ProductResponse[];
  ageGroup: ProductResponse[];
};

const MainProductList = ({
  recommended,
  ranked,
  ageGroup,
}: MainProductListProps) => {
  const router = useRouter();

  const [stories, setStories] = useState<StoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStoryClick = (storyId: number) => {
    router.push(`/story/${storyId}`);
  };

  useEffect(() => {
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

    fetchStories();
  }, []);

  return (
    <div className="flex flex-col gap-12 pt-3 px-4">
      {/* 스토리 영역 */}
      <div>
        <div className="flex justify-between items-center pr-5 mt-4 mb-2">
          <h3 className="text-xl font-semibold text-black">패션 스토리</h3>
          <button
            className="text-sm text-neutral-500 hover:text-black transition-colors"
            onClick={() => router.push("/story")}
          >
            더보기 →
          </button>
        </div>
        {isLoading && <Spinner />}
        {error && <p className="text-red-600">{error}</p>}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <div className="flex gap-6 px-1">
              {stories.map((story) => (
                <div key={story.storyId} className="w-[16rem] flex-shrink-0">
                  <StoryCard story={story} onClick={handleStoryClick} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 추천 상품 섹션 */}
      {recommended[0].id != null && (
        <section>
          <h3 className="text-xl font-semibold mb-4 text-black">
            나에게 맞는 추천 상품
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
            {(recommended || []).slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      {/* 연령대 인기 상품 섹션 */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-black">
          내 연령대가 많이 찾는 상품
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
          {(ageGroup || []).slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      {/* 랭킹 상품 섹션 */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-black">TIO 인기 상품</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
          {(ranked || []).slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainProductList;
