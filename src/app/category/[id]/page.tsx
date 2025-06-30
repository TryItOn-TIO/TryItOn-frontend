import React from "react";

// 임시로 추가
export async function generateStaticParams(){
    return [
        { id: '1'},
        { id: '2'},
        { id: '3'},
        { id: '4'},
        { id: '5'},
        ];
    }

type Params = {
  params: Promise<{ id: string }>;
};

const CategoCategoryry = async({ params }: Params) => {
    const {id} = await params;
  return (
    <div>
      <div>Category 페이지 입니다</div>
      <p>카테고리 ID: {id}</p>
    </div>
  );
};

export default Category;
