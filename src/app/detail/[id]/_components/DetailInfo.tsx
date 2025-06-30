import Image from "next/image";
import React from "react";

const DetailInfo = () => {
  return (
    <div className="w-full h-[800px] relative aspect-auto my-10">
      <Image
        src="/images/dummy/projuct_detail.jpg"
        width={1200}
        height={3000}
        alt="상품 상세 정보"
        className="max-w-full h-auto"
      />
    </div>
  );
};

export default DetailInfo;
