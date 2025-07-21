import { Dispatch, SetStateAction } from "react";
import MenuBar from "./MenuBar";
import NavigateBtn from "./NavigateBtn";
import CustomAlert from "@/components/ui/CustomAlert";
import { useCustomAlert } from "@/hooks/useCustomAlert";

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
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const handleLinkShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      openAlert({
        title: "링크 복사 완료",
        message: "링크가 복사되었습니다!",
        type: "success",
      });
    } catch (err) {
      console.error("링크 복사 실패", err);
      openAlert({
        title: "링크 복사 실패",
        message: "링크 복사에 실패했습니다",
        type: "error",
      });
    }
  };

  return (
    <>
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />

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
          onShare={handleLinkShare}
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
