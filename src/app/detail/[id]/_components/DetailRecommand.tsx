"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";

import SimpleProductCard from "@/components/ui/SimpleProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSimilarProducts } from "@/api/recommend";
import { ProductResponse } from "@/types/product";

type DetailRecommandProps = {
  productId: number;
};

const DetailRecommand = ({ productId }: DetailRecommandProps) => {
  const [data, setDate] = useState<ProductResponse[]>([]);

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

  return data.length > 0 ? (
    <div className="bg-gray-50 py-4 px-3 rounded-lg mt-6 md:py-6 md:px-4 md:rounded-xl md:mt-8">
      <div className="text-sm text-neutral-600 mb-3 md:text-base md:mb-4 md:p-2">
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
      </Swiper>
    </div>
  ) : (
    <div className="w-full h-1 bg-gray-50 mt-10" />
  );
};

export default DetailRecommand;
