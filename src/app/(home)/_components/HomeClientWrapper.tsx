"use client";

import { useEffect, useState } from "react";
import { mainProductsDummy } from "@/mock/mainProducts";
import { fetchMainProductsForGuest } from "@/api/product";
import HomeClient from "@/app/(home)/_components/HomeClient";
import type { MainProductResponse, ProductResponse } from "@/types/product";
import { getAccessToken } from "@/utils/auth";
import {
  getAgeGroupProducts,
  getRecommendProducts,
  getTrendingProducts,
} from "@/api/recommend";

export default function HomeClientWrapper() {
  const [data, setData] = useState<MainProductResponse | null>(null);
  const [recommend, setRecommend] = useState<ProductResponse[]>([]);
  const [trending, setTrending] = useState<ProductResponse[]>([]);
  const [ageGroup, setAgeGroup] = useState<ProductResponse[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 로그인 상태 확인 (인증 유틸 함수 사용)
        const token = getAccessToken();

        console.log("토큰 상태:", token ? "있음" : "없음");

        if (token) {
          console.log("로그인된 사용자 - 개인화된 데이터 로드");
          const [result, recommendResult, trendingResult, ageGroupResult] =
            await Promise.all([
              fetchMainProductsForGuest(), // 카테고리별 상품
              getRecommendProducts(), // 개인화 추천 상품
              getTrendingProducts(), // 인기 상품
              getAgeGroupProducts(), // 연령대별 인기 상품
            ]);

          setData(result);
          setRecommend(recommendResult);
          setTrending(trendingResult);
          setAgeGroup(ageGroupResult);
        } else {
          console.log("비로그인 사용자 - 카테고리별 인기 상품 로드");
          // 카테고리별 상품
          const result = await fetchMainProductsForGuest();
          // 인기 상품
          const trendingResult = await getTrendingProducts();

          setData(result);
          setTrending(trendingResult);
        }
      } catch (error) {
        console.error("메인 상품 데이터를 불러오는 데 실패했습니다", error);
        setError("상품 정보를 불러올 수 없습니다.");
        // 에러 발생 시 Mock 데이터 사용
        setData(mainProductsDummy);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <HomeClient
        initialData={data!}
        recommend={recommend}
        trending={trending}
        ageGroup={ageGroup}
      />
    </div>
  );
}
