"use client";

import BlackButton from "@/components/common/BlackButton";
import Tag from "@/components/common/Tag";
import WhiteButton from "@/components/common/WhiteButton";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductDetailResponse } from "@/types/productDetail";
import Image from "next/image";
import { useState } from "react";

type ProductDetailInfoProps = {
  data: ProductDetailResponse;
};

const ProductDetailInfo = ({ data }: ProductDetailInfoProps) => {
  // TODO: 주문 구현 후 DTO 수정
  const [orderData, setOrderData] = useState({
    id: data.id,
    color: data.variant[0]?.color,
    size: data.variant[0]?.size,
    quantity: 1,
  });

  const { isWished, toggleWishlist } = useWishlist(data.liked, data.id);

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderData({ ...orderData, color: e.target.value });
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
    return data.sale * orderData.quantity;
  };

  const handleOrder = () => {
    // TODO: 주문 구현 후 수정
    console.log("주문 정보:", orderData);
    console.log("총 금액:", calculateTotal());
  };

  const handleAddCart = () => {
    // TODO: 주문 구현 후 수정
    console.log("장바구니 정보:", orderData);
    console.log("총 금액:", calculateTotal());
  };

  return (
    <div className="text-black p-6 pb-[8rem] space-y-4">
      {/* 브랜드 및 제품명 */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">{data.brand}</div>
          <div className="text-xl font-semibold">{data.productName}</div>
        </div>
      </div>

      {/* 가격 정보 */}
      {data.sale ? (
        <div className="space-y-1 mb-6">
          <div className="text-2xl font-bold text-red-600">
            {data.sale.toLocaleString()}원
          </div>
          <div className="text-sm text-gray-400 line-through">
            {data.price.toLocaleString()}원
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-black">
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
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
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
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
        >
          {[...new Set(data.variant.map((v) => v.size))].map((size) => (
            <option key={size} value={size}>
              {size}
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
              className="w-8 h-8 border border-stone-300 bg-gray-100 rounded"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={orderData.quantity}
              onChange={handleQuantityChange}
              className="w-12 h-8 border border-stone-300 text-center text-sm rounded"
            />
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 border border-stone-300 bg-gray-100 rounded"
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
      <div className="mt-10">
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
      <div className="mt-10">
        <label className="block text-sm font-medium mb-1 text-neutral-00">
          {data.content}
        </label>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-6 mt-10">
        <div className="flex flex-col justify-center gap-1">
          {isWished ? (
            <Image
              src={"/images/common/red_heart.svg"}
              width={30}
              height={30}
              alt="heart"
              onClick={toggleWishlist}
            />
          ) : (
            <Image
              src={"/images/common/heart.svg"}
              width={30}
              height={30}
              alt="heart"
              onClick={toggleWishlist}
            />
          )}
          <p className="text-xs">{data.wishlistCount.toLocaleString()}</p>
        </div>
        <WhiteButton text="장바구니" handleClick={handleOrder} />
        <BlackButton text="구매하기" handleClick={handleAddCart} />
      </div>
    </div>
  );
};

export default ProductDetailInfo;
