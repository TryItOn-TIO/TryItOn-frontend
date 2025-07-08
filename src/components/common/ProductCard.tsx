import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductResponse } from "@/types/product";
import { useWishlist } from "@/hooks/useWishlist";
import { useAvatarTryon } from "@/hooks/useAvatarTryon";
import { getAccessToken } from "@/utils/auth";

type ProductCardProps = {
  product: ProductResponse;
  isShareMode?: boolean;
};

const ProductCard = ({ product, isShareMode = false }: ProductCardProps) => {
  const { id, productName, img1, brand, price, sale, liked } = product;

  // API 응답에서 다른 필드명으로 올 수 있는 값들 처리
  const imageUrl = (product as any).imageUrl || img1;
  const actualProductName = (product as any).name || productName; // API에서 name으로 옴
  const actualSale = sale || 0; // API에서 sale이 없으면 0 (할인 없음)
  const actualLiked = liked || false; // API에서 liked가 없으면 false

  // alt 텍스트를 안전하게 생성
  const altText = (() => {
    const safeBrand = brand && brand.trim() !== "" ? brand.trim() : "";
    const safeName =
      actualProductName && actualProductName.trim() !== ""
        ? actualProductName.trim()
        : "";

    if (safeBrand && safeName) {
      return `${safeBrand} ${safeName}`;
    } else if (safeName) {
      return safeName;
    } else if (safeBrand) {
      return `${safeBrand} 상품`;
    } else {
      return "상품 이미지";
    }
  })();

  const formattedPrice = new Intl.NumberFormat("ko-KR").format(price);

  // sale이 할인율(%)인 경우 실제 할인가 계산
  const discountedPrice =
    actualSale > 0 ? Math.round(price * (1 - actualSale / 100)) : price;
  const formattedDiscountedPrice = new Intl.NumberFormat("ko-KR").format(
    discountedPrice
  );

  const { isWished, toggleWishlist } = useWishlist(liked, id);
  const { tryOnProduct } = useAvatarTryon();

  const handleAvatarClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 방지
    e.stopPropagation(); // 이벤트 버블링 방지

    // 로그인 확인
    const token = getAccessToken();
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    try {
      await tryOnProduct(id);
      // TODO: 성공 시 알림이나 아바타 모달 표시
      console.log(`상품 ${id}를 아바타에 착용했습니다!`);
      window.location.reload();
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
            src={
              imageUrl && imageUrl.trim() !== ""
                ? imageUrl
                : "/images/no-image.svg"
            }
            alt={altText}
            fill
            className="object-contain p-2"
            onError={(e) => {
              // 이미지 로드 실패 시 기본 이미지로 대체
              const target = e.target as HTMLImageElement;
              target.src = "/images/no-image.svg";
            }}
          />
        </Link>

        {/* 좋아요 아이콘 - 우측 상단 (공유 모드가 아닐 때만 표시) */}
        {!isShareMode && (
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
        )}

        {/* 아바타 아이콘 - 우측 하단 (공유 모드가 아닐 때만 표시) */}
        {!isShareMode && (
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
        )}
      </div>

      {/* 제품 정보 */}
      <Link href={`/detail/${id}`}>
        <div className="p-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">
            {brand && brand.trim() !== "" ? brand : "브랜드명 없음"}
          </div>
          <div className="text-base font-bold text-black truncate mb-2">
            {actualProductName && actualProductName.trim() !== ""
              ? actualProductName
              : "상품명 없음"}
          </div>

          {/* 가격 정보 */}
          <div className="h-[40px]">
            {actualSale > 0 ? (
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
