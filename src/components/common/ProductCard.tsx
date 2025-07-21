import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductResponse } from "@/types/product";
import { useWishlist } from "@/hooks/useWishlist";
import { useAvatarTryon } from "@/hooks/useAvatarTryon";
import { getAccessToken } from "@/utils/auth";
import TryOnResultModal from "@/components/ui/TryOnResultModal";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

type ProductCardProps = {
  product: ProductResponse;
  isShareMode?: boolean;
};

const ProductCard = ({ product, isShareMode = false }: ProductCardProps) => {
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const { id, productName, img1, brand, price, sale, liked } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const imageUrl = (product as any).imageUrl || img1;
  const actualProductName = (product as any).name || productName;
  const actualSale = sale || 0;
  const actualLiked = liked || false;

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

  const discountedPrice =
    actualSale > 0 ? Math.round(price * (1 - actualSale / 100)) : price;
  const formattedDiscountedPrice = new Intl.NumberFormat("ko-KR").format(
    discountedPrice
  );

  const { isWished, toggleWishlist } = useWishlist(actualLiked, id);
  const { tryOnProduct } = useAvatarTryon();

  const handleAvatarClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 방지
    e.stopPropagation(); // 이벤트 버블링 방지

    const token = getAccessToken();
    if (!token) {
      openAlert({
        title: "안내",
        message: "로그인이 필요한 기능입니다.",
        type: "info",
      });

      return;
    }

    if (isMobile) {
      setIsModalOpen(true);
    }

    try {
      await tryOnProduct(id);
      console.log(`상품 ${id} 착용 요청됨`);
    } catch (error) {
      console.error("아바타 착용 중 오류 발생:", error);
    }
  };

  return (
    <>
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />
      <div className="w-full bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative">
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
                const target = e.target as HTMLImageElement;
                target.src = "/images/no-image.svg";
              }}
            />
          </Link>

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

            <div className="h-[40px]">
              {actualSale > 0 ? (
                <div>
                  <div className="text-base font-bold text-red-500">
                    {formattedDiscountedPrice}원
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
      {/* 모달 렌더링 */}
      {isModalOpen && (
        <TryOnResultModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ProductCard;
