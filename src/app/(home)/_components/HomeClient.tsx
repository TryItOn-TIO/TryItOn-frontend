"use client";

import { useEffect } from "react";
import { MainProductResponse } from "@/types/product";
import MainProductList from "@/app/(home)/_components/MainProductList";
import AvatarLayout from "@/components/layout/AvatarProducts";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";
import { useAvatarStore } from "@/stores/avatar-store";
import { fetchLatestAvatarInfo } from "@/api/avatar";

type HomeClientProps = {
  initialData: MainProductResponse;
};

const HomeClient = ({ initialData }: HomeClientProps) => {
  const { recommended, ranked } = initialData;
  const setAvatarImg = useAvatarStore((state) => state.setAvatarImg);

  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        const data = await fetchLatestAvatarInfo();
        setAvatarImg(data.avatarImg); // 전역 상태에 아바타 이미지 저장
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
      }
    };

    loadAvatarInfo();
  }, [setAvatarImg]);

  return (
    <AvatarLayout
      avatarSlot={<AvatarWearInfo />}
      productSlot={
        <MainProductList recommended={recommended} ranked={ranked} />
      }
    />
  );
};

export default HomeClient;
