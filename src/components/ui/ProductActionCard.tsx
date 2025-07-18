"use client";

import { ProductResponse } from "@/types/product";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import WhiteButton from "@/components/common/WhiteButton";
import BlackButton from "@/components/common/BlackButton";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/hooks/useWishlist";

type ProductActionCardProps = {
  data: ProductResponse;
};

const ProductActionCard = ({ data }: ProductActionCardProps) => {
  const router = useRouter();
  const { toggleWishlist } = useWishlist(data.liked, data.id);
  const [isLiked, setIsLiked] = useState(data.liked);

  useEffect(() => {
    setIsLiked(data.liked);
  }, [data.liked]);

  const handletoggleWishlist = () => {
    // TODO: 주문 구현 후 수정
    console.log("상품 정보:", data);
    toggleWishlist();
    setIsLiked((prev) => !prev);
  };

  const handleMoveDetail = () => {
    // TODO: 주문 구현 후 수정
    console.log("상품 정보:", data);
    router.push(`/detail/${data.id}`);
  };

  const isDiscounted = data.sale > 0; // 할인율이 0보다 크면 할인 중
  const discountedPrice = isDiscounted
    ? Math.round(data.price * (1 - data.sale / 100))
    : data.price;

  const formattedPrice = data.price.toLocaleString();
  const formattedDiscountedPrice = discountedPrice.toLocaleString();

  return (
    <div className="flex h-60 items-stretch gap-4 text-sm text-black hover:opacity-90">
      {/* 이미지 영역 */}
      <div className="h-full w-[200px] bg-neutral-100 relative">
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
                {formattedPrice}원
              </div>
            )}
            <div className="font-semibold text-xl">
              {formattedDiscountedPrice}원
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {isLiked ? (
            <WhiteButton
              text="찜 해제하기"
              handleClick={handletoggleWishlist}
            />
          ) : (
            <WhiteButton text="찜하기" handleClick={handletoggleWishlist} />
          )}
          <BlackButton text="더보기" handleClick={handleMoveDetail} />
        </div>
      </div>
    </div>
  );
};

export default ProductActionCard;
