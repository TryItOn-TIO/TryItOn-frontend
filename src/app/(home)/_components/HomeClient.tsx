"use client";

import { useEffect, useState } from "react";
import { MainProductResponse } from "@/types/product";
import { AvatarProductInfo } from "@/types/avatar";
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
  const [avatarInfo, setAvatarInfo] = useState<AvatarProductInfo | null>(null);
  const setAvatarImg = useAvatarStore((state) => state.setAvatarImg);

  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        const data = await fetchLatestAvatarInfo();
        setAvatarInfo(data);
        setAvatarImg(data.avatarImg); // 전역 상태 저장
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
      }
    };

    loadAvatarInfo();
  }, [setAvatarImg]);

  return (
    <AvatarLayout
      avatarSlot={
        avatarInfo ? (
          <AvatarWearInfo
            avatarId={avatarInfo.avatarId}
            productNames={avatarInfo.productNames}
          />
        ) : (
          <div className="w-full min-h-[30vh] p-4 bg-gray-50 rounded-xl shadow-sm flex items-center justify-center">
            <p className="text-gray-500">아바타 정보를 불러오는 중...</p>
          </div>
        )
      }
      productSlot={
        <MainProductList recommended={recommended} ranked={ranked} />
      }
    />
  );
};

export default HomeClient;
