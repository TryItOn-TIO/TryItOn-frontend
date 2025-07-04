"use client";

import DetailMainImg from "@/app/detail/[id]/_components/DetailMainImg";
import ProductDetailInfo from "@/app/detail/[id]/_components/DetailUserForm";
import DetailRecommand from "@/app/detail/[id]/_components/DetailRecommand";
import DetailInfo from "@/app/detail/[id]/_components/DetailInfo";
import { getProductDetail } from "@/api/productDetail";
import { useEffect, useState } from "react";
import { initialProductDetail } from "@/mock/productDetail";
import Spinner from "@/components/common/Spinner";

type DetailClientProps = {
  productId: number;
};

const DetailClient = ({ productId }: DetailClientProps) => {
  const [data, setData] = useState(initialProductDetail);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getProductDetail(productId);
      setData(data);
      setLoading(false);
    } catch {
      console.error("에러가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
    <>
      {loading && <Spinner />}
      <div className="w-full flex justify-between">
        {/* 좌측 상품 이미지 등 상세정보 */}
        <div className="w-[65%]">
          <DetailMainImg images={data.images} />
          <DetailRecommand data={data} />
          {data.images[4] && <DetailInfo image={data.images[4]} />}
        </div>

        {/* 우측 상품 장바구니/구매하기 창 */}
        <div className="bg-white w-[35%] min-h-screen h-screen fixed right-0 top-[15vh] bottom-0 overflow-y-auto shadow-md">
          <ProductDetailInfo data={data} />
        </div>
      </div>
    </>
  );
};

export default DetailClient;
