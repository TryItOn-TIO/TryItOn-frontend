import { ProductResponse } from "@/types/product";
import Image from "next/image";
import React from "react";
import WhiteButton from "../common/WhiteButton";
import BlackButton from "../common/BlackButton";

type ProductActionCardProps = {
  data: ProductResponse;
};

const ProductActionCard = ({ data }: ProductActionCardProps) => {
  const isDiscounted = data.price != data.sale;

  const handleOrder = () => {
    // TODO: 주문 구현 후 수정
    console.log("주문 정보:", data);
  };

  const handleAddCart = () => {
    // TODO: 주문 구현 후 수정
    console.log("장바구니 정보:", data);
  };

  return (
    <div className="flex h-60 items-stretch gap-4 text-sm text-black hover:opacity-90">
      {/* 이미지 영역 */}
      <div className="h-full w-[320px] bg-neutral-100 relative">
        <Image
          src={data.img1}
          alt={`${data.productName} 이미지`}
          fill
          className="object-contain"
        />
      </div>

      {/* 상품 정보 영역 */}
      <div className="h-full flex flex-col justify-between w-full py-2">
        <div>
          <div className="text-sm text-gray-500">{data.brand}</div>
          <div className="font-medium text-xl">{data.productName}</div>

          <div className="my-2">
            {isDiscounted && (
              <div className="text-gray-400 line-through text-base">
                {data.price.toLocaleString()}원
              </div>
            )}
            <div className="font-semibold text-xl">
              {data.sale.toLocaleString()}원
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <WhiteButton text="찜하기" handleClick={handleAddCart} />
          <BlackButton text="더보기" handleClick={handleOrder} />
        </div>
      </div>
    </div>
  );
};

export default ProductActionCard;
