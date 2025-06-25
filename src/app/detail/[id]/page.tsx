import React from "react";

interface DetailPageProps {
  params: { id: string };
}

const Detail = ({ params }: DetailPageProps) => {
  const { id } = params;

  return (
    <div>
      <div>Detail 페이지입니다</div>
      <p>상품 ID: {id}</p>
    </div>
  );
};

export default Detail;
