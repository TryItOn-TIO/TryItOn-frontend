import { CommentType } from "@/types/story";
import React from "react";

type CommentProps = {
  data: CommentType;
};

const Comment = ({ data }: CommentProps) => {
  return (
    <div
      key={data.id}
      className="absolute bg-yellow-100 text-black text-xs px-2 py-1 rounded shadow max-w-[150px] break-words z-30"
      style={{
        top: data.position.x,
        left: data.position.y,
      }}
    >
      <div className="font-semibold">{data.username}</div>
      <div className="text-sm">{data.content}</div>
      <div className="text-[10px] text-gray-500 mt-1">
        {data.createAt.slice(0, 10)}
      </div>
    </div>
  );
};

export default Comment;
