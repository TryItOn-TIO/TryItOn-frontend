import { Dispatch, SetStateAction } from "react";
import MenuBar from "./MenuBar";
import NavigateBtn from "./NavigateBtn";

type StoryControlBarProps = {
  liked: boolean;
  commentOn: boolean;
  setCommentOn: Dispatch<SetStateAction<boolean>>;
  clothesOn: boolean;
  setClothesOn: Dispatch<SetStateAction<boolean>>;
  postComment: boolean;
  setPostComment: Dispatch<SetStateAction<boolean>>;
  onLike: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const StoryControlBar = ({
  liked,
  commentOn,
  setCommentOn,
  clothesOn,
  setClothesOn,
  postComment,
  setPostComment,
  onLike,
  onNext,
  onPrev,
}: StoryControlBarProps) => {
  return (
    <>
      {/* 메뉴바 */}
      <div className="absolute left-4 bottom-20 bg-white bg-opacity-95 rounded-2xl shadow-lg backdrop-blur-sm">
        <MenuBar
          liked={liked}
          onLike={onLike}
          commentOn={commentOn}
          setCommentOn={setCommentOn}
          clothesOn={clothesOn}
          setClothesOn={setClothesOn}
          postComment={postComment}
          setPostComment={setPostComment}
        />
      </div>

      {/* 스토리 전환 버튼 */}
      <div className="space-y-10 absolute top-2/5 right-4">
        <NavigateBtn onNextPage={onNext} onPrevPage={onPrev} />
      </div>
    </>
  );
};

export default StoryControlBar;
