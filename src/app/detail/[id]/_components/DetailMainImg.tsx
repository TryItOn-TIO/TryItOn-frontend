"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useState } from "react";
import AvatarModal from "@/components/ui/AvatarModal";

type DetailMainImgProps = {
  images: string[];
};

const DetailMainImg = ({ images }: DetailMainImgProps) => {
  const [tryon, setTryon] = useState(false);

  const handleModalClose = () => {
    setTryon(false);
  };

  return (
    <>
      {tryon && <AvatarModal onClose={handleModalClose} />}
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
                <div className="absolute top-4 right-4 z-10 cursor-pointer">
                  {/* 입어보기 버튼 */}
                  <Image
                    src="/images/common/try_icon.svg"
                    width={50}
                    height={50}
                    alt="입어보기"
                    onClick={() => setTryon(true)}
                  />
                </div>
                {/* 제품 사진 */}
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
    </>
  );
};

export default DetailMainImg;
