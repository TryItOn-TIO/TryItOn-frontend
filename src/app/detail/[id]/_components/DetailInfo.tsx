import Image from "next/image";
import React from "react";

type DetailInfoProps = {
  image: string;
};

const DetailInfo = ({ image }: DetailInfoProps) => {
  return (
    <div className="w-full h-[800px] relative aspect-auto my-10">
      <Image
        src={image}
        width={1200}
        height={3000}
        alt="상품 상세 정보"
        className="max-w-full h-auto"
      />
    </div>
  );
};

export default DetailInfo;
