"use client";

import { useEffect, useState } from "react";
import { mainProductsDummy } from "@/mock/mainProducts";
import { fetchMainProducts } from "@/api/product";
import HomeClient from "@/app/(home)/_components/HomeClient";
import GuestHome from "@/app/(home)/_components/GuestHome";
import { useAuth } from "@/hooks/useAuth";
import type { MainProductResponse } from "@/types/product";

export default function Home() {
  const [data, setData] = useState<MainProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchMainProducts();
        setData(result);
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

  // 인증 상태나 데이터 로딩 중일 때
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 발생 시
  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 로그인 상태에 따른 조건부 렌더링
  if (isAuthenticated) {
    // 로그인한 유저 - 기존 HomeClient
    return (
      <div className="w-full">
        <HomeClient initialData={data!} />
      </div>
    );
  } else {
    // 로그인하지 않은 유저 - 새로운 GuestHome
    return (
      <div className="w-full">
        <GuestHome initialData={data!} />
      </div>
    );
  }
}
