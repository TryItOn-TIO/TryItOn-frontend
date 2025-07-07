/* 아바타 및 착장 정보 표시 */

"use client";

import React, { useEffect } from "react";
import { useAvatarStore } from "@/stores/avatar-store";
import { getAccessToken } from "@/utils/auth";
import { fetchLatestAvatarInfo } from "@/api/avatar";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";

const CategoryAvatarClient = () => {
  const setAvatarImg = useAvatarStore((state) => state.setAvatarImg);

  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          // 로그인하지 않은 경우 기본 아바타 이미지 설정
          setAvatarImg("/images/default-avatar.png");
          return;
        }

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

  // AvatarWearInfo 컴포넌트는 내부적으로 avatar store를 사용하므로 props 없이 사용
  return <AvatarWearInfo />;
};

export default CategoryAvatarClient;
