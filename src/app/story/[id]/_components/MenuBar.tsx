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
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-2 py-4 bg-[rgba(156,156,156,0.1)] rounded-2xl">
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
      <Image
        src="/images/common/share.svg"
        alt="↗️"
        width={30}
        height={30}
        className="cursor-pointer"
      />
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
    </div>
  );
};

export default MenuBar;
