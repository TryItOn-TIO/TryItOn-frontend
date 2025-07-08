import React from "react";
import ProductCard from "@/components/common/ProductCard"; // 여기가 핵심!
import type { ProductResponse } from "@/types/product";

type Props = {
  products: ProductResponse[];
  totalCount: number;
};

export default function SearchResults({ products, totalCount }: Props) {
  if (totalCount === 0) {
    return (
      <p className="text-center mt-6 text-gray-500">검색 결과가 없습니다.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
