import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductResponse } from "@/types/product";

type ProductCardProps = {
  product: ProductResponse;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, productName, img1, brand, price, sale, liked } = product;

  const formattedPrice = new Intl.NumberFormat("ko-KR").format(price);
  const formattedSale = new Intl.NumberFormat("ko-KR").format(sale);

  return (
    <div className="w-[240px] bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative">
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
        <div className="absolute top-3 right-3">
          <Image
            src={
              liked
                ? "/images/common/heart_filled.svg"
                : "/images/common/heart.svg"
            }
            width={26}
            height={26}
            alt="찜하기"
          />
        </div>

        {/* 아바타 아이콘 - 우측 하단 */}
        <div className="absolute bottom-3 right-3">
          <Image
            src="/images/common/avatar.svg"
            width={32}
            height={32}
            alt="아바타 아이콘"
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
                <div className="text-base font-bold text-red-500">
                  {formattedSale}원
                </div>
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
