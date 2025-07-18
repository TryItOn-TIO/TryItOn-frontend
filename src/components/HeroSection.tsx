"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AvatarPreview from "@/components/AvatarPreview";
import ProductCard from "./common/ProductCard";
import { getTrendingProducts } from "@/api/recommend";
import { MainProductResponse, ProductResponse } from "@/types/product";
import { fetchMainProductsForGuest } from "@/api/product";
import { useIsMobile } from "@/hooks/useMediaQuery";
import Spinner from "./common/Spinner";

const HeroSection = () => {
  const isMobile = useIsMobile(); // 모바일 여부 판단

  const [isLoading, setIsLoading] = useState(false);
  const [trendingProducts, setTrendingProducts] = useState<ProductResponse[]>(
    []
  );
  const [categoryProducts, setCategoryProducts] =
    useState<MainProductResponse>();

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        setIsLoading(true);
        const trendingResponse = await getTrendingProducts();
        setTrendingProducts(trendingResponse);
      } catch (error) {
        console.error("인기 상품 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategoryData = async () => {
      const categoryResponse = await fetchMainProductsForGuest();
      setCategoryProducts(categoryResponse);
    };

    fetchTrendingData();
    fetchCategoryData();
  }, []);

  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-100 via-white to-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Interactive Try-On Experience */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-12 hover:shadow-3xl transition-shadow duration-300">
            <div className="text-center mb-8">
              <h2 className="md:text-2xl font-bold mb-2">
                {isMobile ? (
                  <>
                    <p className="text-sm text-primary mb-3 text-gray-400">
                      🤔 어떤 옷이 나에게 어울릴까?
                    </p>
                    <p className="text-lg  text-gray-900 leading-snug">
                      아바타로 먼저 입어보고, <br />내 스타일을 발견해보세요
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg text-primary mb-1 text-gray-400">
                      🤔 어떤 옷이 나에게 어울릴까?
                    </p>
                    <p className="text-xl text-gray-900">
                      아바타로 먼저 입어보고, 내 스타일을 발견해보세요
                    </p>
                  </>
                )}
              </h2>
              {/* 
            <p className="text-gray-600 mt-6 text-sm md:text-base">
            마음에 드는 옷을 클릭하면 아바타가 착용해볼 수 있어요
            </p> */}
            </div>

            <div className="flex justify-center">
              {/* Avatar Preview Component */}
              <AvatarPreview />
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-4">
            <Link
              href="/signin"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-500 hover:from-gray-900 hover:to-gray-500 text-white px-8 py-4 rounded-full text-sm md:text-lg font-semibold transition-all duration-200 hover:shadow-xl hover:scale-105 group"
            >
              무료 회원가입하고 내 아바타 만들기
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <p className="text-sm text-gray-500">
              이미 계정이 있으신가요?
              <Link
                href="/signin"
                className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline"
              >
                로그인하기
              </Link>
            </p>
          </div>

          {isLoading ? (
            <div className="w-screen flex justify-center">
              <iframe
                className="w-20"
                src="https://lottie.host/embed/17cfaef6-f1cf-4ee8-a07e-943f60d3c330/VPi3Q5w5il.lottie"
              ></iframe>
            </div>
          ) : (
            <>
              {/* // 추천 상품 섹션 */}
              {trendingProducts &&
                trendingProducts.length > 0 && ( // trendingProducts가 존재하는지 먼저 확인
                  <section className="mt-10">
                    <h3 className="text-xl font-semibold mb-4 text-black">
                      TIO의 인기 상품
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
                      {trendingProducts.slice(0, 8).map(
                        (
                          product // || [] 제거
                        ) => (
                          <ProductCard key={product.id} product={product} />
                        )
                      )}
                    </div>
                  </section>
                )}

              {/* // 카테고리별 상품 섹션 */}
              {categoryProducts?.categories?.map((category) => (
                <section key={category.categoryId} className="mt-10">
                  <h3 className="text-xl font-semibold mb-4 text-black">
                    {category.categoryName}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
                    {(category.products || []).slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
