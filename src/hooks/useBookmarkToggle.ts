import { addBookmark, removeBookmark } from "@/api/bookmark";
import { useState } from "react";

export const useBookmarkToggle = (initial: boolean, avatarId: number) => {
  const [isBookmarked, setIsBookmarked] = useState(initial);

  const toggle = async () => {
    try {
      if (isBookmarked) {
        await removeBookmark(avatarId);
        setIsBookmarked(false);
      } else {
        await addBookmark(avatarId);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("북마크 토글 중 에러 발생", error);
    }
  };

  return { isBookmarked, toggleBookmark: toggle };
};
