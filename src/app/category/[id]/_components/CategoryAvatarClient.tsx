/* 아바타 및 착장 정보 표시 */

"use client";

import React, { useEffect, useState } from "react";
import { useAvatarStore } from "@/stores/avatar-store";
import { getAccessToken } from "@/utils/auth";
import { fetchLatestAvatarInfo } from "@/api/avatar";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";
import type { AvatarProductInfo } from "@/types/avatar";

const CategoryAvatarClient = () => {
  const avatarImg = useAvatarStore((state) => state.avatarImg);
  const setAvatarImg = useAvatarStore((state) => state.setAvatarImg);
  const [avatarInfo, setAvatarInfo] = useState<AvatarProductInfo | null>(null);

  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          const defaultAvatarInfo: AvatarProductInfo = {
            avatarId: 0,
            avatarImg: avatarImg || "/images/default-avatar.png",
            productNames: ["기본 아바타"],
          };
          setAvatarInfo(defaultAvatarInfo);
          return;
        }

        const data = await fetchLatestAvatarInfo();
        setAvatarInfo(data);
        setAvatarImg(data.avatarImg); // 전역 상태 업데이트
      } catch (error) {
        // 에러 발생 시 전역 상태의 아바타 이미지 사용
        const fallbackAvatarInfo: AvatarProductInfo = {
          avatarId: 0,
          avatarImg: avatarImg || "/images/default-avatar.png",
          productNames: ["기본 아바타"],
        };
        setAvatarInfo(fallbackAvatarInfo);
      }
    };

    loadAvatarInfo();
  }, [avatarImg, setAvatarImg]);

  if (!avatarInfo) {
    return (
      <div className="w-full min-h-[30vh] p-4 bg-gray-50 rounded-xl shadow-sm flex items-center justify-center">
        <p className="text-gray-500">아바타 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <AvatarWearInfo
      avatarId={avatarInfo.avatarId}
      productNames={avatarInfo.productNames}
    />
  );
};

export default CategoryAvatarClient;
