import { ProductResponse } from "@/types/product";
import Image from "next/image";

type SimpleProductCardProps = {
  data: ProductResponse;
};

const SimpleProductCard = ({ data }: SimpleProductCardProps) => {
  const isDiscounted = data.sale > 0;
  const discountedPrice = Math.round(data.price * (1 - data.sale / 100));

  return (
    <div className="flex flex-col w-[12rem] text-sm text-black hover:opacity-90">
      {/* 이미지 */}
      <div className="w-full aspect-[3/4] relative rounded-md overflow-hidden bg-neutral-100">
        {data.img1 && (
          <Image
            src={data.img1}
            alt={`${data.productName} 이미지`}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* 브랜드 */}
      <div className="text-xs text-gray-500 mt-2">{data.brand}</div>

      {/* 상품명 */}
      <div className="font-medium">{data.productName}</div>

      {/* 가격 */}
      <div className="flex items-center gap-1 my-1">
        {isDiscounted && (
          <>
            <div className="text-red-500 font-bold">{data.sale}%</div>
            <div className="text-gray-400 line-through text-xs">
              {data.price.toLocaleString()}원
            </div>
          </>
        )}
        <div className="font-semibold">
          {isDiscounted
            ? discountedPrice.toLocaleString()
            : data.price.toLocaleString()}
          원
        </div>
      </div>
    </div>
  );
};

export default SimpleProductCard;
