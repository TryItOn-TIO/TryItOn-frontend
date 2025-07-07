"use client";

import { useEffect, useState } from "react";
import { mainProductsDummy } from "@/mock/mainProducts";
import { fetchMainProducts, fetchMainProductsForGuest } from "@/api/product";
import HomeClient from "@/app/(home)/_components/HomeClient";
import type { MainProductResponse } from "@/types/product";
import { getAccessToken } from "@/utils/auth";

export default function Home() {
  const [data, setData] = useState<MainProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // 로그인 상태 확인 (인증 유틸 함수 사용)
        const token = getAccessToken();
        
        console.log('토큰 상태:', token ? '있음' : '없음');
        
        if (token) {
          console.log('🔐 로그인된 사용자 - 개인화된 데이터 로드');
          try {
            const result = await fetchMainProducts();
            console.log('✅ 로그인용 API 성공:', result);
            console.log('recommended 개수:', result.recommended?.length || 0);
            console.log('ranked 개수:', result.ranked?.length || 0);
            setData(result);
          } catch (authError) {
            console.error('❌ 개인화된 데이터 로드 실패:', authError);
            console.log('비로그인 데이터로 대체');
            const result = await fetchMainProductsForGuest();
            setData(result);
          }
        } else {
          console.log('👤 비로그인 사용자 - 카테고리별 인기 상품 로드');
          const result = await fetchMainProductsForGuest();
          setData(result);
        }
      } catch (error) {
        console.error("메인 상품 데이터를 불러오는 데 실패했습니다", error);
        setError("상품 정보를 불러올 수 없습니다.");
        // 에러 발생 시 Mock 데이터 사용
        console.log('❌ 에러 발생 - Mock 데이터 사용');
        setData(mainProductsDummy);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
      <HomeClient initialData={data!} />
    </div>
  );
}
