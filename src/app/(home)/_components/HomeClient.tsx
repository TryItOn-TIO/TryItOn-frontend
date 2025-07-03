"use client";

import { MainProductResponse } from "@/types/product";
import AvatarProducts from "@/app/(home)/_components/AvatarProducts";
import MainProductList from "@/app/(home)/_components/MainProductList";
import AvatarLayout from "@/components/layout/AvatarProducts";

type HomeClientProps = {
  initialData: MainProductResponse;
};

const HomeClient = ({ initialData }: HomeClientProps) => {
  const { recommended, ranked, avatarInfo } = initialData;

  return (
    <AvatarLayout
      avatarSlot={<AvatarProducts avatarInfo={avatarInfo} />}
      productSlot={
        <MainProductList recommended={recommended} ranked={ranked} />
      }
    />
  );
};

export default HomeClient;
