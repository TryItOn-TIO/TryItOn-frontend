import { axiosWithAuth } from "@/api";
import { SortType } from "@/constants/SortType";
import {
  StoriesResponse,
  StoryRequest,
  StoryResponse,
  StoryUpdate,
} from "@/types/story";

export const postStories = async (data: StoryRequest): Promise<Boolean> => {
  const response = await axiosWithAuth().post("/api/stories", { data });
  return response.data;
};

export const getStories = async (
  sort: SortType,
  limit: number
): Promise<StoriesResponse> => {
  const response = await axiosWithAuth().get(
    `/api/stories?sort=${sort}&limit=${limit}`
  );
  return response.data;
};

export const getNextStories = async (
  storyId: number,
  sort: SortType,
  limit: number
): Promise<StoriesResponse> => {
  const response = await axiosWithAuth().get(
    `/api/stories/next?currentStoryId=${storyId}&sort=${sort}&limit=${limit}`
  );
  return response.data;
};

export const updateStory = async (
  storyId: number,
  data: StoryUpdate
): Promise<StoryResponse> => {
  const response = await axiosWithAuth().put(`/api/stories/${storyId}`, {
    data,
  });
  return response.data;
};

export const deleteStory = async (storyId: number): Promise<Boolean> => {
  const response = await axiosWithAuth().delete(`/api/stories/${storyId}`);
  return response.data;
};

/*
 * response data
 * true: 좋아요 추가
 * false: 좋아요 삭제
 */
export const toggleStoryLike = async (storyId: number): Promise<Boolean> => {
  const response = await axiosWithAuth().post(`/api/stories/${storyId}/like`);
  return response.data;
};

export const getStoryLikeStatus = async (storyId: number): Promise<Boolean> => {
  const response = await axiosWithAuth().get(`/api/stories/${storyId}/like`);
  return response.data;
};
