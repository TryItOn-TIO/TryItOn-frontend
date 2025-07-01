import React from "react";

type AvatarProductsProps = {
  avatarSlot: React.ReactNode;
  productSlot: React.ReactNode;
};

const AvatarProducts = ({ avatarSlot, productSlot }: AvatarProductsProps) => {
  return (
    <div className="relative flex justify-between w-full px-6">
      {/* 좌측 아바타 영역 (20%) */}
      <aside className="w-[20%] pr-4 fixed left-0 top-[15vh] bottom-0 min-h-screen">
        {avatarSlot}
      </aside>

      {/* 우측 상품 목록 영역 (80%) */}
      <main className="absolute right-0 w-[80%]">{productSlot}</main>
    </div>
  );
};

export default AvatarProducts;
