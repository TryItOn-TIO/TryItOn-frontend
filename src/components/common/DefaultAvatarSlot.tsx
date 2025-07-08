import React from "react";

// 기본 아바타 슬롯 (비로그인 사용자용)
const DefaultAvatarSlot = () => {
  return (
    <div className="w-full h-[85vh] p-4 bg-gray-50 rounded-xl shadow-sm flex flex-col items-center justify-center gap-3">
      <div className="text-6xl mb-4">👤</div>
      <p className="text-gray-600 text-center mb-4">
        나만의 아바타로 <br />
        옷을 입어보세요!
      </p>
      <p className="text-gray-500 text-sm text-center">
        로그인하면 나의 아바타를 등록할 수 있습니다.
      </p>
    </div>
  );
};

export default DefaultAvatarSlot;
