import { axiosWithoutAuth } from "@/api";
import { StoryResponse } from "@/types/story";

export const getStories = async (): Promise<StoryResponse[]> => {
  const response = await axiosWithoutAuth().get(
    "/api/stories?sort=latest&limit=10"
  );
  return response.data;
};

export const getNextStories = async (id: number): Promise<StoryResponse[]> => {
  const response = await axiosWithoutAuth().get(
    `/api/stories/next?currentStoryId=${id}&sort=latest&limit=10`
  );
  return response.data;
};
