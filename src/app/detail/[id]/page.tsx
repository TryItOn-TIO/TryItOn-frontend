import DetailClient from "@/app/detail/[id]/_components/DetailClient";
import { getProductDetail } from "@/api/productDetail";
import { notFound } from "next/navigation";
import { dummyProductDetail } from "@/mock/productDetail";

// 정적으로 생성할 경로 지정
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

// 정적 페이지에 필요한 데이터 요청
export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    const product = dummyProductDetail; // 실제 API 요청
    // const product = await getProductDetail(id); // 실제 API 요청
    return (
      <div className="w-full">
        <DetailClient productId={id} initialData={product} />
      </div>
    );
  } catch (error) {
    // 상품이 없는 경우 404 페이지로 이동
    return notFound();
  }
}
