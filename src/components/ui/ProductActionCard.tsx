"use client";

import { ProductResponse } from "@/types/product";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/hooks/useWishlist";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

type ProductActionCardProps = {
  data: ProductResponse;
};

const ProductActionCard = ({ data }: ProductActionCardProps) => {
  const router = useRouter();
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();
  const { toggleWishlist } = useWishlist({ 
    initial: data.liked, 
    productId: data.id,
    openAlert 
  });
  const [isLiked, setIsLiked] = useState(data.liked);

  useEffect(() => {
    setIsLiked(data.liked);
  }, [data.liked]);

  const handletoggleWishlist = async () => {
    console.log("상품 정보:", data);
    const success = await toggleWishlist();
    if (success) {
      setIsLiked((prev) => !prev);
    }
  };

  const handleMoveDetail = () => {
    console.log("상품 정보:", data);
    router.push(`/detail/${data.id}`);
  };

  const isDiscounted = data.sale > 0;
  const discountedPrice = isDiscounted
    ? Math.round(data.price * (1 - data.sale / 100))
    : data.price;

  const formattedPrice = data.price.toLocaleString();
  const formattedDiscountedPrice = discountedPrice.toLocaleString();

  return (
    <>
      <div className="flex h-60 items-stretch gap-4 text-sm text-black hover:opacity-90">
        {/* 이미지 영역 */}
        <div className="h-full w-[200px] bg-neutral-100 relative">
          <Image
            src={data.img1}
            alt={`${data.productName} 이미지`}
            fill
            className="object-contain"
          />
        </div>

        {/* 상품 정보 영역 */}
        <div className="h-full flex flex-col justify-between w-full py-2">
          <div>
            <div className="text-sm text-gray-500">{data.brand}</div>
            <div className="font-medium text-base">{data.productName}</div>

            <div className="my-2">
              {isDiscounted && (
                <div className="text-gray-400 line-through text-base">
                  {formattedPrice}원
                </div>
              )}
              <div className="font-semibold text-xl">
                {formattedDiscountedPrice}원
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {isLiked ? (
              <button
                type="submit"
                onClick={handletoggleWishlist}
                className={`w-full cursor-pointer rounded-md bg-white py-2 px-4 border border-transparent text-center text-base text-neutral-800 transition-all shadow-md hover:shadow-lg focus:bg-gray-100 focus:shadow-none active:bg-gray-100 hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              >
                찜 해제하기
              </button>
            ) : (
              <button
                type="submit"
                onClick={handletoggleWishlist}
                className={`w-full cursor-pointer rounded-md bg-white py-2 px-4 border border-transparent text-center text-base text-neutral-800 transition-all shadow-md hover:shadow-lg focus:bg-gray-100 focus:shadow-none active:bg-gray-100 hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              >
                찜하기
              </button>
            )}
            <button
              type="submit"
              onClick={handleMoveDetail}
              className={`w-full cursor-pointer rounded-md bg-black py-2 px-4 border border-transparent text-center text-base text-white transition-all shadow-md hover:shadow-lg focus:bg-neutral-700 focus:shadow-none active:bg-neutral-700 hover:bg-neutral-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            >
              더보기
            </button>
          </div>
        </div>
      </div>

      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />
    </>
  );
};

export default ProductActionCard;
