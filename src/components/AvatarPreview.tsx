"use client";

import { useState } from "react";
import Image from "next/image";

const clothingItems = [
  {
    id: 1,
    name: "블랙 후디",
    type: "top",
    code: "c",
    image: "/images/home/top-c.webp",
  },
  {
    id: 2,
    name: "반팔 셔츠",
    type: "top",
    code: "a",
    image: "/images/home/top-a.webp",
  },
  {
    id: 3,
    name: "블루 티셔츠",
    type: "top",
    code: "b",
    image: "/images/home/top-b.webp",
  },
  {
    id: 4,
    name: "데님 진",
    type: "bottom",
    code: "a",
    image: "/images/home/bottom-a.jpg",
  },
  {
    id: 5,
    name: "브라운 코튼 팬츠",
    type: "bottom",
    code: "b",
    image: "/images/home/bottom-b.jpg",
  },
  {
    id: 6,
    name: "화이트 진",
    type: "bottom",
    code: "c",
    image: "/images/home/bottom-c.webp",
  },
];

export default function AvatarPreview() {
  const [selectedTop, setSelectedTop] = useState(clothingItems[0]);
  const [selectedBottom, setSelectedBottom] = useState(clothingItems[3]);
  const [isAnimating, setIsAnimating] = useState(false);

  // 상의와 하의 코드를 조합하여 착장 이미지 경로 생성
  const getCombinedImagePath = () => {
    const topCode = selectedTop.code;
    const bottomCode = selectedBottom.code;
    return `/images/home/${topCode}${bottomCode}.webp`;
  };

  const handleClothingChange = (item: (typeof clothingItems)[0]) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (item.type === "top") {
        setSelectedTop(item);
      } else {
        setSelectedBottom(item);
      }
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start justify-center gap-10 max-w-6xl mx-auto">
      {/* Avatar Display */}
      <div className="relative">
        <div className="w-80 h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
          {/* Combined Outfit Image */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? "scale-105 opacity-80" : "scale-100 opacity-100"
            }`}
          >
            <div className="relative w-64 h-80">
              <Image
                src={getCombinedImagePath()}
                alt={`${selectedTop.name}와 ${selectedBottom.name} 착장`}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          {/* Sparkle Effects */}
          {isAnimating && (
            <>
              <svg
                className="absolute top-4 right-4 w-6 h-6 text-yellow-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <svg
                className="absolute bottom-8 left-4 w-4 h-4 text-blue-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <svg
                className="absolute top-1/2 right-2 w-5 h-5 text-purple-400 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </>
          )}
        </div>

        {/* Current Outfit Info */}
        {/* <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">현재 착용중</p>
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">
              {selectedTop.name}, {selectedBottom.name}
            </p>
          </div>
          <p className="text-lg font-bold text-blue-600">
            총{" "}
            {(
              parseInt(selectedTop.price.replace(/[^0-9]/g, "")) +
              parseInt(selectedBottom.price.replace(/[^0-9]/g, ""))
            ).toLocaleString()}
            원
          </p>
        </div>*/}
      </div>

      {/* Clothing Options */}
      <div className="space-y-8">
        {/* 상의 선택 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            {/* 티셔츠 아이콘 */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 4h2v2h8V4h2l2 4v14H4V8l2-4z M10 6v2h4V6 M4 8h2v4H4 M18 8h2v4h-2"
              />
            </svg>
            상의 선택
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {clothingItems
              .filter((item) => item.type === "top")
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClothingChange(item)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedTop.id === item.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-700">
                    {item.name}
                  </p>
                </button>
              ))}
          </div>
        </div>

        {/* 하의 선택 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            {/* 바지 아이콘 */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 2v4l-2 14h4l2-10 2 10h4l-2-14V2H8z"
              />
            </svg>
            하의 선택
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {clothingItems
              .filter((item) => item.type === "bottom")
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClothingChange(item)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedBottom.id === item.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-700">
                    {item.name}
                  </p>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
