"use client";

import React from "react";
import HeroSection from "./HeroSection";
import ProductSection from "./ProductSection";
import type { MainProductResponse } from "@/types/product";

type GuestHomeProps = {
  initialData: MainProductResponse;
};

const GuestHome = ({ initialData }: GuestHomeProps) => {
  const { recommended, ranked } = initialData;

  return (
    <div className="min-h-screen w-full bg-white -mt-10 pb-8">
      <main className="w-full">
        <HeroSection />

        {/* 인기 상품 섹션 */}
        <ProductSection
          title="인기 상품"
          subtitle="다른 사용자들이 아바타에게 가장 많이 입혀본 아이템들"
          products={ranked}
        />

        {/* 신상품 섹션 */}
        <ProductSection
          title="신상품"
          subtitle="새로 출시된 따끈따끈한 신상 아이템들"
          products={recommended}
        />
      </main>
    </div>
  );
};

export default GuestHome;
