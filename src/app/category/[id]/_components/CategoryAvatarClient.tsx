/* 아바타 및 착장 정보 표시 */

"use client";

import React from "react";
import { getAccessToken } from "@/utils/auth";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";
import DefaultAvatarSlot from "@/components/common/DefaultAvatarSlot";

const CategoryAvatarClient = () => {
  const token = getAccessToken();
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    return <AvatarWearInfo />;
  } else {
    return <DefaultAvatarSlot />;
  }
};

export default CategoryAvatarClient;
