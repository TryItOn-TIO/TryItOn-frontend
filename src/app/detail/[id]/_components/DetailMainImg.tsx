"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

type DetailMainImgProps = {
  images: string[];
};

const DetailMainImg = ({ images }: DetailMainImgProps) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-lg overflow-hidden"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            {/* 헤더 15vh 제외, 전체 화면 (height) */}
            <div className="relative w-full h-[85vh]">
              <Image
                src={img}
                alt={`제품 이미지 ${idx}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailMainImg;
