"use client";

import ProductCard from "@/components/common/ProductCard";

export default function Home() {
  return (
    <div>
      <ProductCard
        product={{
          id: 1,
          productName: "테스트 티셔츠",
          img1: "/images/dummy/ex10.png",
          brand: "디키즈",
          price: 75000,
          sale: 100,
          liked: true,
          wishlistCount: 123,
          createdAt: "2025-06-30T10:00:00",
          categoryId: 1,
          categoryName: "하의",
        }}
      />
    </div>
  );
}
