import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type MenuBarProps = {
  liked: boolean;
  onLike: () => void;

  commentOn: boolean;
  setCommentOn: Dispatch<SetStateAction<boolean>>;

  clothesOn: boolean;
  setClothesOn: Dispatch<SetStateAction<boolean>>;

  postComment: boolean;
  setPostComment: Dispatch<SetStateAction<boolean>>;

  onShare: () => void;
};

const MenuBar = ({
  liked,
  onLike,
  commentOn,
  setCommentOn,
  clothesOn,
  setClothesOn,
  postComment,
  setPostComment,
  onShare,
}: MenuBarProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 px-3 py-4">
        <div className="flex flex-col items-center text-xs text-neutral-400 gap-1 hover:text-neutral-700 transition-colors">
          <Image
            src={
              liked
                ? "/images/common/red_heart.svg"
                : "/images/common/gray_heart.svg"
            }
            alt="🤍"
            width={30}
            height={30}
            onClick={onLike}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
          <p className="font-medium">좋아요</p>
        </div>

        <div className="flex flex-col items-center text-xs text-neutral-400 gap-1 hover:text-neutral-700 transition-colors">
          <Image
            src={
              clothesOn
                ? "/images/common/clothes_on.svg"
                : "/images/common/clothes_off.svg"
            }
            alt="👕"
            width={34}
            height={34}
            onClick={() => setClothesOn((prev) => !prev)}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
          <p className="font-medium">착장 정보</p>
        </div>

        <div className="flex flex-col items-center text-xs text-neutral-400 gap-1 hover:text-neutral-700 transition-colors">
          <Image
            src="/images/common/share.svg"
            alt="↗️"
            width={25}
            height={25}
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={onShare}
          />
          <p className="font-medium">공유하기</p>
        </div>

        <div className="flex flex-col items-center text-xs text-neutral-400 gap-1 hover:text-neutral-700 transition-colors">
          <Image
            src={
              commentOn
                ? "/images/common/toggle_on.svg"
                : "/images/common/toggle_off.svg"
            }
            alt="on/off"
            width={30}
            height={30}
            onClick={() => setCommentOn((prev) => !prev)}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
          <p className="font-medium">댓글 보기</p>
        </div>

        <div className="flex flex-col items-center text-xs text-neutral-400 gap-1 hover:text-neutral-700 transition-colors">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all ${
              postComment
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setPostComment((prev) => !prev)}
          >
            <span className="text-lg">✏️</span>
          </div>
          <p className="font-medium">댓글 작성</p>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
