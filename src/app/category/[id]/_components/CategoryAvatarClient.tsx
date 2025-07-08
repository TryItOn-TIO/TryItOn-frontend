/* 아바타 및 착장 정보 표시 */

"use client";

import React, { useEffect } from "react";
import { useAvatarStore } from "@/stores/avatar-store";
import { getAccessToken } from "@/utils/auth";
import { fetchLatestAvatarInfo } from "@/api/avatar";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";
import DefaultAvatarSlot from "@/components/common/DefaultAvatarSlot";

const CategoryAvatarClient = () => {
  const setAvatarImg = useAvatarStore((state) => state.setAvatarImg);

  const token = getAccessToken();
  const isLoggedIn = !!token;

  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        const data = await fetchLatestAvatarInfo();
        setAvatarImg(data.avatarImg); // 전역 상태 업데이트
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
        // 에러 발생 시 기본 아바타 이미지 설정
        setAvatarImg("/images/default-avatar.png");
      }
    };

    loadAvatarInfo();
  }, [setAvatarImg]);

  if (isLoggedIn) {
    return <AvatarWearInfo />;
  } else {
    return <DefaultAvatarSlot />;
  }
};

export default CategoryAvatarClient;
