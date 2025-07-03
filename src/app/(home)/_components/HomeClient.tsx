"use client";

import { MainProductResponse } from "@/types/product";
import MainProductList from "@/app/(home)/_components/MainProductList";
import AvatarLayout from "@/components/layout/AvatarProducts";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";

type HomeClientProps = {
  initialData: MainProductResponse;
};

const HomeClient = ({ initialData }: HomeClientProps) => {
  const { recommended, ranked, avatarInfo } = initialData;

  return (
    <AvatarLayout
      avatarSlot={<AvatarWearInfo avatarInfo={avatarInfo} />}
      productSlot={
        <MainProductList recommended={recommended} ranked={ranked} />
      }
    />
  );
};

export default HomeClient;
