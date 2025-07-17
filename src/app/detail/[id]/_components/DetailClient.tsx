"use client";

import DetailMainImg from "@/app/detail/[id]/_components/DetailMainImg";
import ProductDetailInfo from "@/app/detail/[id]/_components/DetailUserForm";
import DetailRecommand from "@/app/detail/[id]/_components/DetailRecommand";
import DetailInfo from "@/app/detail/[id]/_components/DetailInfo";
import { getProductDetail } from "@/api/productDetail";
import { useEffect, useState } from "react";
import Spinner from "@/components/common/Spinner";
import { initialProductDetail } from "@/types/productDetail";
import { useIsMobile } from "@/hooks/useMediaQuery";

type DetailClientProps = {
  productId: number;
};

const DetailClient = ({ productId }: DetailClientProps) => {
  const [data, setData] = useState(initialProductDetail);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  const fetchData = async () => {
    try {
      const data = await getProductDetail(productId);
      setData(data);
      setLoading(false);
    } catch (error: any) {
      console.error("상품 상세 조회 에러:", error);
      console.error("에러 응답:", error.response?.data);
      console.error("에러 상태:", error.response?.status);
      console.error("요청 URL:", error.config?.url);
      console.error("요청 productId:", productId);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
    <>
      {loading && <Spinner />}
      {/* 모바일 전용 : ProductDetailInfo를 MainImg 바로 아래에 위치 */}
      {isMobile ? (
        <>
          <DetailMainImg images={data.images} productId={productId} />
          <ProductDetailInfo data={data} />
          <DetailRecommand productId={productId} />
          {data.images
            .slice(4)
            .filter((img) => img && img.trim() !== "")
            .map((img, idx) => (
              <DetailInfo key={idx} image={img} index={idx} />
            ))}
        </>
      ) : (
        <div className="w-full flex flex-col md:flex-row justify-between">
          {/* 좌측: 메인 이미지 + 추천 + 상세 이미지 */}
          <div className="w-full md:w-[65%] md:pr-6">
            <DetailMainImg images={data.images} productId={productId} />
            <DetailRecommand productId={Number(productId)} />

            {/* img5 배열의 모든 상세 이미지 표시 */}
            {data.images
              .slice(4)
              .filter((img) => img && img.trim() !== "")
              .map((img, idx) => (
                <DetailInfo key={idx} image={img} index={idx} />
              ))}
          </div>

          {/* 우측 상품 장바구니/구매하기 창 */}
          <div className="w-full md:w-[35%] md:min-h-screen md:h-screen md:fixed md:right-0 md:top-[15vh] md:bottom-0 md:overflow-y-auto md:shadow-md md:bg-white">
            <ProductDetailInfo data={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailClient;
