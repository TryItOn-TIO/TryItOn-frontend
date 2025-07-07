"use client";

import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { ProductResponse } from "@/types/product";

type MainProductListProps = {
  recommended: ProductResponse[];
  ranked: ProductResponse[];
};

const MainProductList = ({ recommended, ranked }: MainProductListProps) => {
  return (
    <div className="flex flex-col gap-12 pt-3 pb-8">
      {/* 추천 상품 섹션 */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-black">추천 상품</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
          {recommended.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 랭킹 상품 섹션 */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-black">인기 상품</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
          {ranked.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainProductList;
