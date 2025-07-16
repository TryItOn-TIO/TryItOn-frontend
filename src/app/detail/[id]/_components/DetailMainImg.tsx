"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import React, { useState } from "react";
import { useAvatarTryon } from "@/hooks/useAvatarTryon";
import { getAccessToken } from "@/utils/auth";
import TryOnResultModal from "@/components/ui/TryOnResultModal";

type DetailMainImgProps = {
  images: string[];
  productId: number;
};

const DetailMainImg = ({ images, productId }: DetailMainImgProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tryOnProduct } = useAvatarTryon();

  const handleAvatarClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = getAccessToken();
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    setIsModalOpen(true); // 상세 페이지에서는 항상 모달을 연다

    try {
      await tryOnProduct(productId);
      console.log(`상품 ${productId} 착용 요청됨`);
    } catch (error) {
      console.error("아바타 착용 중 오류 발생:", error);
    }
  };

  const validImages = images
    .filter((img) => img && img.trim() !== "")
    .slice(0, 10);

  if (validImages.length === 0) {
    return (
      <div className="w-full h-[85vh] bg-gray-200 flex items-center justify-center">
        <p>이미지를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full relative">
        {" "}
        {/* 부모 컨테이너 추가 및 relative 설정 */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1}
          className="rounded-lg overflow-hidden"
        >
          {validImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[85vh]">
                <Image
                  src={img}
                  alt={`제품 이미지 ${idx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={idx === 0}
                  onError={(e) => {
                    console.error(`이미지 로드 실패: ${img}`);
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 아바타 버튼을 Swiper 외부로 이동 */}
        <div
          className="absolute top-4 right-4 z-10 cursor-pointer"
          onClick={handleAvatarClick}
        >
          <Image
            src="/images/common/avatar.svg"
            width={50}
            height={50}
            alt="입어보기"
          />
        </div>
      </div>

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <TryOnResultModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default DetailMainImg;
