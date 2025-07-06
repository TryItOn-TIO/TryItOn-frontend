"use client";

import { useEffect, useState } from "react";
import { mainProductsDummy } from "@/mock/mainProducts";
import { fetchMainProducts } from "@/api/product";
import HomeClient from "@/app/(home)/_components/HomeClient";
import type { MainProductResponse } from "@/types/product";

export default function Home() {
  const [data, setData] = useState<MainProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error && !data) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      <HomeClient initialData={data!} />
    </div>
  );
}
