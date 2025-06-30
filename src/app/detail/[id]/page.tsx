import React from "react";

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
