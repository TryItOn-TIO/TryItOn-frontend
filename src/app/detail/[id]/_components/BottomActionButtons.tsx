"use client";

import Image from "next/image";
import WhiteButton from "@/components/common/WhiteButton";
import BlackButton from "@/components/common/BlackButton";
import { useEffect, useState } from "react";

type Props = {
  isWished: boolean;
  toggleWishlist: () => Promise<boolean>;
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
  const [count, setCount] = useState(wishlistCount);
  const [isWishLoading, setIsWishLoading] = useState(false);

  // isWished prop이 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    console.log("BottomActionButtons: isWished 변경됨", isWished);
    setLiked(isWished);
  }, [isWished]);

  // wishlistCount prop이 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    console.log("BottomActionButtons: wishlistCount 변경됨", wishlistCount);
    setCount(wishlistCount);
  }, [wishlistCount]);

  const handleWishlistClick = async () => {
    if (isWishLoading) return; // 이미 처리 중이면 중복 클릭 방지
    
    console.log("찜 버튼 클릭: 현재 상태", liked);
    setIsWishLoading(true);
    
    try {
      // toggleWishlist가 성공적으로 실행되었을 때만 UI 상태 변경
      const success = await toggleWishlist();
      console.log("찜 토글 결과:", success);
      
      if (success) {
        // 현재 상태의 반대로 변경
        const newLikedState = !liked;
        console.log("새로운 찜 상태:", newLikedState);
        
        setLiked(newLikedState);
        
        // 찜 상태에 따라 카운트 업데이트
        setCount(prev => newLikedState ? prev + 1 : prev - 1);
      }
    } finally {
      setIsWishLoading(false);
    }
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
          className={isWishLoading ? "opacity-70" : ""}
        />
        <p className="text-xs">{count.toLocaleString()}</p>
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
