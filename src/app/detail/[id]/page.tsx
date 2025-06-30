import React from "react";

// 정적 빌드를 위한 generateStaticParams 함수 추가
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    // 필요한 상품 ID들...
  ];
}

type Params = {
  params: Promise<{ id: string }>;
};

const Detail = async ({ params }: Params) => {
  const { id } = await params;

  return (
    <div>
      <div>Detail 페이지입니다</div>
      <p>상품 ID: {id}</p>
    </div>
  );
};

export default Detail;
