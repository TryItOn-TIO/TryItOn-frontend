"use client";

import { useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/common/ProductCard";
import type { ProductResponse } from "@/types/product";

// 임시 더미 데이터
const currentOutfitItems = [
  { id: 1, name: "플리츠 스커트 슬림 베스트 원피스", image: "/images/dummy/ex10.png", category: "원피스" },
  { id: 2, name: "SQUARE BAG MINI_BLACK", image: "/images/dummy/ex10.png", category: "가방" },
  { id: 3, name: "척테일러 올스타 캔버스 블랙", image: "/images/dummy/ex10.png", category: "신발" },
];

const savedOutfits = [
  {
    id: 1,
    name: "캐주얼 룩",
    modelImage: "/images/dummy/ex10.png",
    createdAt: "2025-07-04T10:00:00Z",
    items: {
      top: "머슬핏 티셔츠 화이트",
      bottom: "스탠다드핏 슬랙스",
      shoes: "상품정보 없음",
    },
  },
  {
    id: 2,
    name: "오피스 룩",
    modelImage: "/images/dummy/ex10.png",
    createdAt: "2025-07-03T10:00:00Z",
    items: {
      top: "유니버시티 화이트",
      bottom: "루즈핏 워크팬츠",
      shoes: "상품정보 없음",
    },
  },
];

const wishlistProducts: ProductResponse[] = [
  {
    id: 1,
    productName: "데일리 쿨 하프 니트",
    brand: "메이커",
    price: 25000,
    sale: 25000,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 120,
    createdAt: "2025-06-30T10:51:53.469Z",
    categoryId: 1,
    categoryName: "상의",
  },
  {
    id: 2,
    productName: "더블니 루즈핏 워크팬츠 2종",
    brand: "메이커",
    price: 39500,
    sale: 39500,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 80,
    createdAt: "2025-06-30T10:51:53.469Z",
    categoryId: 2,
    categoryName: "하의",
  },
];

const categories = [
  { id: 0, name: "전체" },
  { id: 1, name: "상의" },
  { id: 2, name: "아우터" },
  { id: 3, name: "바지" },
  { id: 4, name: "원피스" },
  { id: 5, name: "스커트" },
  { id: 6, name: "슈즈" },
];

export default function ClosetPage() {
  const [activeTab, setActiveTab] = useState("저장한 착장");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);

  const tabs = ["저장한 착장", "찜 목록"];

  return (
    <div className="w-full bg-white">
      {/* 헤더 */}
      <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">내 옷장</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              착장 저장
            </button>
            <button className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800">
              새 착장 만들기
            </button>
          </div>
        </div>
        
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-black border-black"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* 현재 착장 사이드바 (왼쪽) */}
        <div className="w-80 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4">현재 착장</h2>
          <div className="space-y-3">
            {currentOutfitItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <span className="text-sm text-gray-700 block">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 p-6">
          {activeTab === "저장한 착장" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">저장한 착장</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedOutfits.map((outfit) => (
                  <div key={outfit.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={outfit.modelImage}
                        alt={outfit.name || "저장된 착장"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{outfit.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        {outfit.items.top && <div>상의: {outfit.items.top}</div>}
                        {outfit.items.bottom && <div>하의: {outfit.items.bottom}</div>}
                        {outfit.items.shoes && <div>신발: {outfit.items.shoes}</div>}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(outfit.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "찜 목록" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">찜 목록</h2>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategoryId(category.id === 0 ? undefined : category.id)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        (selectedCategoryId === undefined && category.id === 0) || 
                        selectedCategoryId === category.id
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
