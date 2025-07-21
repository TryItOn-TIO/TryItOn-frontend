import { CommentResponse } from "@/types/comment";
import React from "react";

type CommentProps = {
  data: CommentResponse;
  // 클릭 이벤트를 위함
  onClick?: (id: number) => void;
};

const Comment = ({ data, onClick }: CommentProps) => {
  const handleClick = () => {
    onClick?.(data.id);
  };

  // 랜덤한 포스트잇 색상 배열
  const commentColors = [
    "bg-blue-100",
    "bg-red-100",
    "bg-purple-100",
    "bg-yellow-100",
    "bg-orange-100",
  ];

  // 랜덤한 테이프 색상 배열
  const tapeColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];

  // 랜덤한 색상 선택
  const randomCommentColor =
    commentColors[Math.floor(Math.random() * commentColors.length)];

  // 랜덤한 색상 선택
  const randomTapeColor =
    tapeColors[Math.floor(Math.random() * tapeColors.length)];

  return (
    <div
      key={data.id}
      className={`absolute ${randomCommentColor} text-black px-4 py-3 rounded-lg shadow-2xl max-w-[200px] break-words z-50
                 transform transition-all duration-300 ease-in-out
                 hover:scale-105 hover:rotate-2 hover:shadow-yellow-500/5
                 active:scale-95 active:rotate-0 cursor-pointer animate-popIn`}
      style={{
        top: data.position.y,
        left: data.position.x,
        // 포스트잇마다 미묘한 회전 변화를 주어 자연스럽게 보이도록
        transform: `translate(-50%, -50%) rotate(${Math.random() * 6 - 3}deg)`,
      }}
      onClick={handleClick}
    >
      {/* 포스트잇 상단 테이프 효과 (세로 및 랜덤 색상) */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-7 ${randomTapeColor} opacity-70 rounded-md shadow-inner transform rotate-20 origin-center`}
      ></div>

      <div className="font-bold text-gray-800 mb-1 text-xs tracking-wide">
        {data.username}
      </div>
      <div
        style={{ wordBreak: "keep-all" }}
        className="text-base text-gray-700 leading-relaxed mb-2 max-h-[80px] overflow-hidden"
      >
        {data.contents}
      </div>
      <div className="text-[10px] text-gray-500 text-right opacity-80">
        {data.createdAt.slice(0, 10)}
      </div>
    </div>
  );
};

export default Comment;
