"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";

import SimpleProductCard from "@/components/ui/SimpleProductCard";
import { ProductDetailResponse } from "@/types/productDetail";
import Link from "next/link";
import { dummyProductDetails } from "@/mock/story";

type DetailRecommandProps = {
  data: ProductDetailResponse;
};

const DetailRecommand = ({ data }: DetailRecommandProps) => {
  const dummyData = dummyProductDetails;

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
        {dummyData.map((data) => (
          <SwiperSlide
            key={data.id}
            style={{ width: "12rem" }}
            className="flex-shrink-0"
          >
            <Link href={`/detail/${data.id}`}>
              <SimpleProductCard data={data} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailRecommand;
