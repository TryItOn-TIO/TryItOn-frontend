"use client";

import { ProductDetailResponse } from "@/types/productDetail";
import DetailMainImg from "@/app/detail/[id]/_components/DetailMainImg";
import ProductDetailInfo from "@/app/detail/[id]/_components/DetailUserForm";
import DetailRecommand from "@/app/detail/[id]/_components/DetailRecommand";
import DetailInfo from "@/app/detail/[id]/_components/DetailInfo";
import { useParams } from "next/navigation";
import { getProductDetail } from "@/api/productDetail";
import { useEffect, useState } from "react";
import { dummyProductDetail } from "@/mock/productDetail";

type DetailClientProps = {
  productId: number;
  initialData: ProductDetailResponse;
};

const DetailClient = ({ productId, initialData }: DetailClientProps) => {
  const [data, setData] = useState(initialData);

  const fetchData = async () => {
    const data = await getProductDetail(productId);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
    <div className="w-full flex justify-between">
      {/* 좌측 상품 이미지 등 상세정보 */}
      <div className="w-[65%]">
        <DetailMainImg images={data.images} />
        <DetailRecommand data={data} />
        {/* TODO: 제품 상세 정보 임의의 사진으로 대체 */}
        <DetailInfo />
      </div>

      {/* 우측 상품 장바구니/구매하기 창 */}
      <div className="bg-white w-[35%] min-h-screen h-screen fixed right-0 top-[15vh] bottom-0 overflow-y-auto shadow-md">
        <ProductDetailInfo data={data} />
      </div>
    </div>
  );
};

export default DetailClient;
