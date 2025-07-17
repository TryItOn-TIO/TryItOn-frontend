"use client";

import Image from "next/image";
import WhiteButton from "@/components/common/WhiteButton";
import BlackButton from "@/components/common/BlackButton";
import { useEffect, useState } from "react";

type Props = {
  isWished: boolean;
  toggleWishlist: () => void;
  wishlistCount: number;
  isOutOfStock: boolean;
  isLoading: boolean;
  onAddCart: () => void;
  onOrder: () => void;
  isMobile: boolean;
};

export default function BottomActionButtons({
  isWished,
  toggleWishlist,
  wishlistCount,
  isOutOfStock,
  isLoading,
  onAddCart,
  onOrder,
  isMobile,
}: Props) {
  const [liked, setLiked] = useState(isWished);

  useEffect(() => {
    setLiked(isWished);
  }, [isWished]);

  const handleWishlistClick = () => {
    setLiked(!liked);
    toggleWishlist();
  };

  return (
    <div className={`flex ${isMobile ? "gap-4" : "gap-6"}`}>
      {/* 위시리스트 하트 */}
      <div
        className="flex flex-col items-center gap-1 cursor-pointer"
        onClick={handleWishlistClick}
      >
        <Image
          src={
            liked ? "/images/common/red_heart.svg" : "/images/common/heart.svg"
          }
          width={24}
          height={24}
          alt="heart"
        />
        <p className="text-xs">{wishlistCount.toLocaleString()}</p>
      </div>

      {/* 장바구니 버튼 */}
      <WhiteButton
        text={isOutOfStock ? "품절" : isLoading ? "추가 중..." : "장바구니"}
        handleClick={onAddCart}
        disabled={isLoading || isOutOfStock}
      />

      {/* 구매하기 버튼 */}
      <BlackButton
        text={isOutOfStock ? "품절" : "구매하기"}
        handleClick={onOrder}
        disabled={isOutOfStock}
      />
    </div>
  );
}
