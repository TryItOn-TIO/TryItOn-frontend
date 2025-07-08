import { useState, useEffect } from "react";
import { ClosetAvatarResponse } from "@/types/closet";
import { getClosetAvatars } from "@/api/closet";

export const useAvatarData = (initialAvatarId?: number) => {
  const [avatars, setAvatars] = useState<ClosetAvatarResponse[]>([]);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] =
    useState<ClosetAvatarResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAvatars = async () => {
    try {
      setAvatarLoading(true);
      setError(null);

      const response = await getClosetAvatars();

      // 응답이 배열이고 비어있지 않은 경우
      if (Array.isArray(response) && response.length > 0) {
        setAvatars(response);
        
        // initialAvatarId가 있으면 해당 아바타를 찾아서 선택
        if (initialAvatarId) {
          const targetAvatar = response.find(avatar => avatar.avatarId === initialAvatarId);
          setSelectedAvatar(targetAvatar || response[0]);
        } else {
          setSelectedAvatar(response[0]); // 첫 번째 아바타를 기본 선택
        }
      } else {
        // 빈 배열이거나 데이터가 없는 경우
        setAvatars([]);
        setSelectedAvatar(null);
      }
    } catch (err) {
      console.error("옷장 정보를 가져오는 중 에러가 발생했습니다:", err);
      setError("옷장 정보를 불러올 수 없습니다. 다시 시도해주세요.");
      setAvatars([]);
      setSelectedAvatar(null);
    } finally {
      setAvatarLoading(false);
    }
  };

  useEffect(() => {
    fetchAvatars();
  }, [initialAvatarId]);

  const hasAvatars = avatars.length > 0;

  return {
    avatars,
    avatarLoading,
    selectedAvatar,
    setSelectedAvatar,
    hasAvatars,
    error,
    refetchAvatars: fetchAvatars,
  };
};
