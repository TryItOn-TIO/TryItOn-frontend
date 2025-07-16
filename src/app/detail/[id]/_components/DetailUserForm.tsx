"use client";

import BlackButton from "@/components/common/BlackButton";
import Tag from "@/components/common/Tag";
import WhiteButton from "@/components/common/WhiteButton";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { ProductDetailResponse } from "@/types/productDetail";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ProductDetailInfoProps = {
  data: ProductDetailResponse;
};

const ProductDetailInfo = ({ data }: ProductDetailInfoProps) => {
  const router = useRouter();

  // TODO: 주문 구현 후 DTO 수정
  const [orderData, setOrderData] = useState({
    id: data.id,
    color: data.variant[0]?.color || "", // 첫 번째 색상으로 설정
    size: "", // 초기값을 빈 문자열로 설정
    quantity: 1,
  });

  // 컴포넌트 마운트 시 색상이 없으면 첫 번째 색상으로 설정
  useEffect(() => {
    if (!orderData.color && data.variant.length > 0) {
      setOrderData((prev) => ({
        ...prev,
        color: data.variant[0].color,
      }));
    }
  }, [data.variant, orderData.color]);

  const { isWished, toggleWishlist } = useWishlist(data.liked, data.id);
  const { addToCart, isLoading } = useCart();

  // 현재 선택된 색상과 사이즈에 해당하는 variantId 찾기
  const getCurrentVariantId = () => {
    const currentVariant = data.variant.find(
      (v) => v.color === orderData.color && v.size === orderData.size
    );
    return currentVariant?.variantId;
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newColor = e.target.value;
    // 색상 변경 시 사이즈를 초기화하여 사용자가 다시 선택하도록 함
    setOrderData({
      ...orderData,
      color: newColor,
      size: "", // 사이즈 초기화
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderData({ ...orderData, size: e.target.value });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Math.max(1, Number(e.target.value));
    setOrderData({ ...orderData, quantity: qty });
  };

  const increaseQuantity = () => {
    setOrderData((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseQuantity = () => {
    setOrderData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  };

  const calculateTotal = () => {
    // salePrice가 있으면 할인가 사용, 없으면 정가 사용
    const price = data.salePrice || data.price;
    return price * orderData.quantity;
  };

  const handleOrder = () => {
    // 필수 옵션 선택 확인
    if (!orderData.color || !orderData.size) {
      alert("색상과 사이즈를 선택해주세요.");
      return;
    }

    const variantId = getCurrentVariantId();
    if (!variantId) {
      alert("선택한 옵션에 해당하는 상품을 찾을 수 없습니다.");
      return;
    }

    // 재고 확인
    const currentVariant = data.variant.find((v) => v.variantId === variantId);
    if (!currentVariant) {
      alert("상품 정보를 찾을 수 없습니다.");
      return;
    }

    if (currentVariant.quantity === 0) {
      alert("품절된 상품입니다.");
      return;
    }

    if (currentVariant.quantity < orderData.quantity) {
      alert(`재고가 부족합니다. (현재 재고: ${currentVariant.quantity}개)`);
      return;
    }

    // 주문 정보를 URL 파라미터로 전달
    const orderInfo = {
      type: "direct", // 직접 구매
      productId: data.id,
      productName: data.productName,
      brand: data.brand,
      price: data.salePrice || data.price,
      originalPrice: data.price,
      image: data.images[0] || "",
      color: orderData.color,
      size: orderData.size,
      quantity: orderData.quantity,
      variantId: variantId,
      sale: data.sale || 0,
    };

    // URL 파라미터로 주문 정보 전달
    const params = new URLSearchParams({
      data: JSON.stringify(orderInfo),
    });

    router.push(`/order?${params.toString()}`);
  };

  const handleAddCart = async () => {
    const variantId = getCurrentVariantId();

    if (!variantId) {
      alert("선택한 옵션에 해당하는 상품을 찾을 수 없습니다.");
      return;
    }

    // 재고 확인
    const currentVariant = data.variant.find((v) => v.variantId === variantId);
    if (!currentVariant) {
      alert("상품 정보를 찾을 수 없습니다.");
      return;
    }

    if (currentVariant.quantity === 0) {
      alert("품절된 상품입니다.");
      return;
    }

    if (currentVariant.quantity < orderData.quantity) {
      alert(`재고가 부족합니다. (현재 재고: ${currentVariant.quantity}개)`);
      return;
    }

    await addToCart(variantId, orderData.quantity);
  };

  // 현재 선택된 상품이 품절인지 확인
  const isCurrentVariantOutOfStock = () => {
    const currentVariant = data.variant.find(
      (v) => v.color === orderData.color && v.size === orderData.size
    );
    return currentVariant?.quantity === 0;
  };

  return (
    <div className="text-black p-4 space-y-3 md:p-6 md:pb-[8rem] md:space-y-4">
      {/* 브랜드 및 제품명 */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-xs text-gray-500 md:text-sm">{data.brand}</div>
          <div className="text-lg font-semibold md:text-xl">
            {data.productName}
          </div>
        </div>
      </div>

      {/* 가격 정보 */}
      {data.sale && data.sale > 0 ? (
        <div className="space-y-1 mb-4 md:mb-6">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
              {data.sale}% OFF
            </span>
          </div>
          <div className="text-xl font-bold text-red-600 md:text-2xl">
            {(data.salePrice || data.price).toLocaleString()}원
          </div>
          <div className="text-xs text-gray-400 line-through md:text-sm">
            {data.price.toLocaleString()}원
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="text-xl font-bold text-black md:text-2xl">
            {data.price.toLocaleString()}원
          </div>
        </div>
      )}

      {/* 컬러 선택 */}
      <div>
        <label className="block text-sm font-medium mb-1">컬러</label>
        <select
          value={orderData.color}
          onChange={handleColorChange}
          className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm md:px-3 md:py-2"
        >
          {[...new Set(data.variant.map((v) => v.color))].map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* 사이즈 선택 */}
      <div>
        <label className="block text-sm font-medium mb-1">사이즈</label>
        <select
          value={orderData.size}
          onChange={handleSizeChange}
          className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm md:px-3 md:py-2"
        >
          <option value="" disabled>
            사이즈를 선택해주세요
          </option>
          {data.variant
            .filter((v) => v.color === orderData.color)
            .map((variant, index) => (
              <option key={index} value={variant.size}>
                {variant.size}{" "}
                {variant.quantity === 0
                  ? "(품절)"
                  : `(재고: ${variant.quantity}개)`}
              </option>
            ))}
        </select>
      </div>

      {/* 수량 및 총 금액 */}
      <div className="flex items-end justify-between mt-2">
        <div>
          <label className="block text-sm font-medium mb-1">수량</label>
          <div className="flex items-center gap-1">
            <button
              onClick={decreaseQuantity}
              className="w-7 h-7 border border-stone-300 bg-gray-100 rounded md:w-8 md:h-8"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={orderData.quantity}
              onChange={handleQuantityChange}
              className="w-10 h-7 border border-stone-300 text-center text-sm rounded md:w-12 md:h-8"
            />
            <button
              onClick={increaseQuantity}
              className="w-7 h-7 border border-stone-300 bg-gray-100 rounded md:w-8 md:h-8"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-right text-lg font-semibold">
          {calculateTotal().toLocaleString()}원
        </div>
      </div>

      {/* 연관 태그 */}
      <div className="mt-6 md:mt-10">
        <label className="block text-sm font-medium mb-1">연관 태그</label>
        <div className="flex flex-wrap gap-2">
          <Tag text="기본슬랙스" />
          <Tag text="슬랙스" />
          <Tag text="팬츠" />
          <Tag text="디키즈" />
          <Tag text="바지" />
          <Tag text="기본템" />
          <Tag text="하의" />
          <Tag text="루즈핏" />
          <Tag text="더블니" />
          <Tag text="남성바지" />
        </div>
      </div>

      {/* 사이즈 추천 등 */}
      <div className="mt-6 md:mt-10">
        <label className="block text-sm font-medium mb-1 text-neutral-00">
          {data.contents}
        </label>
      </div>

      {/* 버튼 영역 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 z-40 md:static md:p-0 md:border-none">
        <div className="flex gap-4 md:gap-6">
          <div className="flex flex-col items-center gap-1">
            {isWished ? (
              <Image
                src={"/images/common/red_heart.svg"}
                width={24}
                height={24}
                alt="heart"
                onClick={toggleWishlist}
              />
            ) : (
              <Image
                src={"/images/common/heart.svg"}
                width={24}
                height={24}
                alt="heart"
                onClick={toggleWishlist}
              />
            )}
            <p className="text-xs">{data.wishlistCount.toLocaleString()}</p>
          </div>
          <WhiteButton
            text={
              isCurrentVariantOutOfStock()
                ? "품절"
                : isLoading
                ? "추가 중..."
                : "장바구니"
            }
            handleClick={handleAddCart}
            disabled={isLoading || isCurrentVariantOutOfStock()}
          />
          <BlackButton
            text={isCurrentVariantOutOfStock() ? "품절" : "구매하기"}
            handleClick={handleOrder}
            disabled={isCurrentVariantOutOfStock()}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
