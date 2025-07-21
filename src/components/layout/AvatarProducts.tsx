import React from "react";

type AvatarProductsProps = {
  avatarSlot: React.ReactNode;
  productSlot: React.ReactNode;
};

const AvatarProducts = ({ avatarSlot, productSlot }: AvatarProductsProps) => {
  return (
    <div className="relative flex justify-between w-full px-6">
      {/* 좌측 아바타 영역 (PC: 20%, 모바일: 숨김) */}
      <aside className="hidden md:block w-[20%] pr-4 fixed left-0 top-16 bottom-0 min-h-screen">
        {avatarSlot}
      </aside>

      {/* 우측 상품 목록 영역 (PC: 80%, 모바일: 100%) */}
      <main className="absolute right-0 w-full md:w-[80%]">{productSlot}</main>
    </div>
  );
};

export default AvatarProducts;
