import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type MenuBarProps = {
  liked: boolean;
  onLike: () => void;

  commentOn: boolean;
  setCommentOn: Dispatch<SetStateAction<boolean>>;

  clothesOn: boolean;
  setClothesOn: Dispatch<SetStateAction<boolean>>;
};

const MenuBar = ({
  liked,
  onLike,
  commentOn,
  setCommentOn,
  clothesOn,
  setClothesOn,
}: MenuBarProps) => {
  const handleLinkShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("링크 복사 실패", err);
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-2 py-4 bg-[rgba(156,156,156,0.1)] rounded-2xl">
      <div className="flex flex-col items-center text-xs text-neutral-600 gap-1">
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
          className="cursor-pointer"
        />
        <p>좋아요</p>
      </div>
      <div className="flex flex-col items-center text-xs text-neutral-600 gap-1">
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
          className="cursor-pointer"
        />
        <p>착장 정보</p>
      </div>
      <div className="flex flex-col items-center text-xs text-neutral-600 gap-1">
        <Image
          src="/images/common/share.svg"
          alt="↗️"
          width={25}
          height={25}
          className="cursor-pointer"
          onClick={handleLinkShare}
        />
        <p>공유하기</p>
      </div>
      <div className="flex flex-col items-center text-xs text-neutral-600 gap-1">
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
          className="cursor-pointer"
        />
        <p>댓글</p>
      </div>
    </div>
  );
};

export default MenuBar;
