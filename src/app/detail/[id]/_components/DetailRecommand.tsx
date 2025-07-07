"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";

import SimpleProductCard from "@/components/ui/SimpleProductCard";
import Link from "next/link";
import { dummyProductDetails } from "@/mock/story";
import { useEffect, useState } from "react";
import { getSimilarProducts } from "@/api/productDetail";
import { initialProductResponse, ProductResponse } from "@/types/product";

type DetailRecommandProps = {
  productId: number;
};

const DetailRecommand = ({ productId }: DetailRecommandProps) => {
  const dummyData = dummyProductDetails;
  const [data, setDate] = useState<ProductResponse[]>(initialProductResponse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSimilarProducts(productId);
        setDate(response);
      } catch {
        console.log("유사 상품을 불러오는 중 에러가 발생했습니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 py-6 px-4 rounded-xl mt-8">
      <div className="text-base text-neutral-600 mb-4 p-2">
        같이 볼만한 상품
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        modules={[FreeMode]}
        className="w-full"
      >
        {data.map((product) => (
          <SwiperSlide
            key={product.id}
            style={{ width: "12rem" }}
            className="flex-shrink-0"
          >
            <Link href={`/detail/${product.id}`}>
              <SimpleProductCard data={product} />
            </Link>
          </SwiperSlide>
        ))}
        {/* {dummyData.map((data) => (
          <SwiperSlide
            key={data.id}
            style={{ width: "12rem" }}
            className="flex-shrink-0"
          >
            <Link href={`/detail/${data.id}`}>
              <SimpleProductCard data={data} />
            </Link>
          </SwiperSlide>
        ))} */}
      </Swiper>
    </div>
  );
};

export default DetailRecommand;
