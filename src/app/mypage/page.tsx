"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import React from "react";

const Mypage = () => {
  useAuthGuard();

  return (
    <div>
      <div>Mypage 페이지 입니다</div>
    </div>
  );
};

export default Mypage;
