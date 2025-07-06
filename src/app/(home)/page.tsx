import { mainProductsDummy } from "@/mock/mainProducts";
import HomeClient from "@/app/(home)/_components/HomeClient";

export default async function Home() {
  try {
    // TODO: 실제 API 연결 성공 시 아래 주석 해제
    // const data = await fetchMainProducts();
    const data = mainProductsDummy;

    return (
      <div className="w-full">
        <HomeClient initialData={data} />
      </div>
    );
  } catch (error) {
    console.error("메인 상품 데이터를 불러오는 데 실패했습니다", error);
    return <div>상품 정보를 불러올 수 없습니다.</div>;
  }
}
