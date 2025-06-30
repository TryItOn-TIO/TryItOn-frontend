"use client";

import { ProductDetailResponse } from "@/types/productDetail";
import { useEffect, useState } from "react";
import DetailMainImg from "@/app/detail/[id]/_components/DetailMainImg";
import { getProductDetail } from "@/api/productDetail";
import ProductDetailInfo from "./ProductDetailInfo";

type DetailClientProps = {
  productId: number;
};

const DetailClient = ({ productId }: DetailClientProps) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<ProductDetailResponse>({
    id: productId,
    productName: "더블니 85283 루즈핏 워크팬츠 2종",
    brand: "디키즈",
    price: 75000,
    sale: 69830,
    content: "비슷한 체형(100cm,00kg)은 M, L을 많이 구매했어요",
    images: [
      "/images/dummy/item1.webp",
      "/images/dummy/item2.webp",
      "/images/dummy/item3.webp",
    ],
    wishlistCount: 1213,
    liked: true,
    variant: [
      {
        variantId: 1,
        size: "S",
        color: "black",
        quantity: 50,
      },
      {
        variantId: 2,
        size: "M",
        color: "black",
        quantity: 50,
      },
      {
        variantId: 3,
        size: "L",
        color: "black",
        quantity: 50,
      },
      {
        variantId: 4,
        size: "S",
        color: "brown",
        quantity: 50,
      },
      {
        variantId: 5,
        size: "M",
        color: "brown",
        quantity: 50,
      },
      {
        variantId: 6,
        size: "L",
        color: "brown",
        quantity: 50,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await getProductDetail(productId);
      setLoading(false);
      setData(response);
    } catch (error) {
      console.log("상품을 가져오는 데 에러가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    // fetchData();
  }, [productId]);

  return (
    <>
      {!loading && (
        <div className="w-full flex justify-between">
          <div className="w-[65%]">
            <DetailMainImg images={data.images} />
          </div>
          <div className="bg-white w-[35%] min-h-screen h-screen fixed right-0 top-[15vh] overflow-scroll shadow-md">
            <ProductDetailInfo data={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailClient;
