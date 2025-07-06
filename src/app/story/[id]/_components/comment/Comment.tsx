import { CommentResponse } from "@/types/comment";
import React from "react";

type CommentProps = {
  data: CommentResponse;
};

const Comment = ({ data }: CommentProps) => {
  return (
    <div
      key={data.id}
      className="absolute bg-gradient-to-br from-yellow-100 to-yellow-200 text-black text-xs px-3 py-2 rounded-lg shadow-lg max-w-[180px] break-words z-50 border border-yellow-300 animate-fadeIn hover:scale-105 transition-transform cursor-pointer"
      style={{
        top: data.position.y,
        left: data.position.x,
      }}
    >
      {/* 포스트잇 상단 테이프 효과 */}
      <div className="absolute -top-1 left-2 w-6 h-2 bg-yellow-400 opacity-60 rounded-sm"></div>

      <div className="font-semibold text-gray-800 mb-1">{data.username}</div>
      <div className="text-sm text-gray-700 leading-relaxed mb-2">
        {data.contents}
      </div>
      <div className="text-[10px] text-gray-500 text-right">
        {data.createdAt.slice(0, 10)}
      </div>

      {/* 포스트잇 그림자 효과 */}
      <div className="absolute -bottom-1 -right-1 w-full h-full bg-yellow-300 opacity-20 rounded-lg -z-10"></div>
    </div>
  );
};

export default Comment;
