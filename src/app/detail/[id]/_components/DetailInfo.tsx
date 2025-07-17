import Image from "next/image";
import React from "react";

type DetailInfoProps = {
  image: string;
  index?: number;
};

const DetailInfo = ({ image, index = 0 }: DetailInfoProps) => {
  // 이미지 유효성 검사
  if (!image || image.trim() === "") {
    return null;
  }
  return (
    <div className="w-full relative my-6 md:my-10">
      <Image
        src={image}
        alt={`상품 상세 정보 ${index + 1}`} // index 사용
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
        onError={(e) => {
          console.error(`상세 이미지 로드 실패: ${image}`);
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
};

export default DetailInfo;
