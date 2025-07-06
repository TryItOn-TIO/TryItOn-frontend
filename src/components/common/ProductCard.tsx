import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductResponse } from "@/types/product";
import { useWishlist } from "@/hooks/useWishlist";
import { useAvatarTryon } from "@/hooks/useAvatarTryon";

type ProductCardProps = {
  product: ProductResponse;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, productName, img1, brand, price, sale, liked } = product;

  const formattedPrice = new Intl.NumberFormat("ko-KR").format(price);
  
  // sale이 할인율(%)인 경우 실제 할인가 계산
  const discountedPrice = sale > 0 ? Math.round(price * (1 - sale / 100)) : price;
  const formattedDiscountedPrice = new Intl.NumberFormat("ko-KR").format(discountedPrice);

  const { isWished, toggleWishlist } = useWishlist(liked, id);
  const { tryOnProduct } = useAvatarTryon();

  const handleAvatarClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 방지
    e.stopPropagation(); // 이벤트 버블링 방지

    try {
      await tryOnProduct(id);
      // TODO: 성공 시 알림이나 아바타 모달 표시
      console.log(`상품 ${id}를 아바타에 착용했습니다!`);
    } catch (error) {
      console.error("아바타 착용 중 오류 발생:", error);
      // TODO: 에러 알림 표시
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative">
      {/* 이미지 */}
      <div className="w-full h-[240px] bg-gray-100 relative">
        <Link href={`/detail/${id}`}>
          <Image
            src={img1}
            alt={productName}
            fill
            className="object-contain p-2"
          />
        </Link>

        {/* 좋아요 아이콘 - 우측 상단 */}
        <div
          className="absolute top-3 right-3"
          onClick={toggleWishlist}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={
              isWished
                ? "/images/common/red_heart.svg"
                : "/images/common/heart.svg"
            }
            width={26}
            height={26}
            alt="찜하기"
          />
        </div>

        {/* 아바타 아이콘 - 우측 하단 */}
        <div
          className="absolute bottom-3 right-3 cursor-pointer hover:scale-110 transition-transform"
          onClick={handleAvatarClick}
        >
          <Image
            src="/images/common/avatar.svg"
            width={32}
            height={32}
            alt="아바타 착용"
          />
        </div>
      </div>

      {/* 제품 정보 */}
      <Link href={`/detail/${id}`}>
        <div className="p-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">
            {brand}
          </div>
          <div className="text-base font-bold text-black truncate mb-2">
            {productName}
          </div>

          {/* 가격 정보 */}
          <div className="h-[40px]">
            {sale > 0 ? (
              <div>
                {/* 할인가 */}
                <div className="text-base font-bold text-red-500">
                  {formattedDiscountedPrice}원
                </div>
                {/* 정가 */}
                <div className="text-sm text-gray-400 line-through">
                  {formattedPrice}원
                </div>
              </div>
            ) : (
              <div className="text-base font-bold text-black">
                {formattedPrice}원
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
