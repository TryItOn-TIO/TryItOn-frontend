"use client";

import React from "react";

type Variant = {
  variantId: number;
  color: string;
  size: string;
  quantity: number;
};

type OrderData = {
  color: string;
  size: string;
  quantity: number;
};

type OrderOptionsProps = {
  isMobile: boolean;
  orderData: OrderData;
  variantList: Variant[];
  calculateTotal: () => number;
  handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  setShowOptions?: (value: boolean) => void;
};

const OrderOptions = ({
  isMobile,
  orderData,
  variantList,
  calculateTotal,
  handleColorChange,
  handleSizeChange,
  handleQuantityChange,
  increaseQuantity,
  decreaseQuantity,
  setShowOptions,
}: OrderOptionsProps) => {
  const uniqueColors = [...new Set(variantList.map((v) => v.color))];
  const sizesForSelectedColor = variantList.filter(
    (v) => v.color === orderData.color
  );

  return (
    <>
      {/* 모바일에서만 핸들 영역 표시 */}
      {isMobile && (
        <div
          className="flex items-center justify-center py-2 cursor-pointer"
          onClick={() => setShowOptions?.(false)}
          data-mds="BottomSheetHandleArea"
        >
          <div
            className="h-1 w-9 rounded-[10px] bg-gray-300"
            data-mds="BottomSheetHandle"
          ></div>
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
          {uniqueColors.map((color) => (
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
          {/* <option value="" disabled>
            사이즈를 선택해주세요
          </option> */}
          {sizesForSelectedColor.map((variant, index) => (
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
    </>
  );
};

export default OrderOptions;
