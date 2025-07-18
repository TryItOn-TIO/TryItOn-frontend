"use client";

import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { ProductResponse } from "@/types/product";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex flex-col gap-12 pt-3">
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

      {/* 추천 상품 섹션 */}
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
