"use client";

import { useSearchParams } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import React from "react";

const TryonRoomClient = () => {
  useAuthGuard();

  const searchParams = useSearchParams();
  const productIds = searchParams.get("product_ids");

  // 쿼리 파라미터에서 상품 ID들을 배열로 변환
  const selectedProductIds = productIds
    ? productIds.split(",").map((id) => parseInt(id))
    : [];

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-black">
          친구와 함께 고르기
        </h1>

        {selectedProductIds.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              선택된 상품들 ({selectedProductIds.length}개)
            </h2>
            <div className="space-y-2">
              {selectedProductIds.map((productId, index) => (
                <div key={productId} className="text-sm text-gray-600">
                  상품 ID: {productId}
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              * 여기에 실제 상품 정보를 불러와서 친구와 함께 고르는 기능을
              구현할 수 있습니다.
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-xl font-semibold text-gray-600 mb-4">
              선택된 상품이 없습니다
            </div>
            <div className="text-gray-500">
              옷장에서 상품을 선택하고 공유해주세요.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryonRoomClient;
