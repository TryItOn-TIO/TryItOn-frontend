import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductResponse } from "@/types/product";
import { addWishlist, removeWishlist } from "@/api/wishlist";

type ProductCardProps = {
  product: ProductResponse;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, productName, img1, brand, price, sale, liked } = product;

  const formattedPrice = new Intl.NumberFormat("ko-KR").format(price);
  const formattedSale = new Intl.NumberFormat("ko-KR").format(sale);

  const handleAddwishlist = async () => {
    try {
      await addWishlist({ productId: Number(product.id) });
      confirm("찜 목록에 추가되었습니다.");
      // 리프레시
      window.location.reload();
    } catch (error) {
      console.error("찜 추가 중 에러 발생", error);
    }
  };

  const handleDeletewishlist = async () => {
    try {
      await removeWishlist({ productId: Number(product.id) });
      confirm("찜 목록에서 삭제되었습니다.");
      // 리프레시
      window.location.reload();
    } catch (error) {
      console.error("찜 삭제 중 에러 발생", error);
    }
  };

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
                ? "/images/common/red_heart.svg"
                : "/images/common/heart.svg"
            }
            width={26}
            height={26}
            alt="찜하기"
            onClick={liked ? handleDeletewishlist : handleAddwishlist}
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
