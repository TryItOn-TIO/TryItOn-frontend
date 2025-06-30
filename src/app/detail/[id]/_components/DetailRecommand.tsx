"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";

import SimpleProductCard from "@/components/ui/SimpleProductCard";
import { ProductDetailResponse } from "@/types/productDetail";
import Link from "next/link";

type DetailRecommandProps = {
  data: ProductDetailResponse;
};

const DetailRecommand = ({ data }: DetailRecommandProps) => {
  const dummyData = [
    {
      id: 1,
      productName: "상품명1",
      brand: "브랜드1",
      price: 1000,
      sale: 1000,
      thumbnail: "/images/signup/female_body_shape1.png",
    },
    {
      id: 2,
      productName: "상품명2",
      brand: "브랜드2",
      price: 2000,
      sale: 1000,
      thumbnail: "/images/signup/female_body_shape2.png",
    },
    {
      id: 3,
      productName: "상품명3",
      brand: "브랜드3",
      price: 3000,
      sale: 2000,
      thumbnail: "/images/signup/female_body_shape3.png",
    },
    {
      id: 4,
      productName: "상품명4",
      brand: "브랜드4",
      price: 4000,
      sale: 4000,
      thumbnail: "/images/signup/female_body_shape4.png",
    },
    {
      id: 5,
      productName: "상품명5",
      brand: "브랜드5",
      price: 5000,
      sale: 3000,
      thumbnail: "/images/signup/female_body_shape5.png",
    },
  ];

  return (
    <div className="bg-gray-50 py-6 px-4 rounded-xl mt-8">
      <div className="text-base text-neutral-600 mb-4 p-2">
        같이 볼 만한 상품
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
              <SimpleProductCard
                id={data.id}
                productName={data.productName}
                brand={data.brand}
                price={data.price}
                sale={data.sale}
                thumbnail={data.thumbnail}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailRecommand;
