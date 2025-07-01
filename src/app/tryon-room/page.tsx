"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import React from "react";

const TryonRoom = () => {
  useAuthGuard();

  return (
    <div>
      <div>TryonRoom 페이지 입니다</div>
    </div>
  );
};

export default TryonRoom;
