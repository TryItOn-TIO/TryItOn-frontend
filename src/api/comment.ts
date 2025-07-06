import { CommentRequest, CommentResponse } from "@/types/comment";
import { axiosWithAuth } from ".";

export const createComment = async (
  storyId: number,
  data: CommentRequest
): Promise<CommentResponse> => {
  const response = await axiosWithAuth().post(
    `/api/story/${storyId}/comments`,
    data
  );
  return response.data;
};

export const getComments = async (
  storyId: number
): Promise<CommentResponse[]> => {
  const response = await axiosWithAuth().get(`/api/story/${storyId}/comments`);
  return response.data;
};

export const updateComment = async (
  storyId: number,
  commentId: number,
  data: CommentRequest
): Promise<CommentResponse> => {
  const response = await axiosWithAuth().put(
    `/api/story/${storyId}/comments/${commentId}`,
    { data }
  );
  return response.data;
};

export const deleteComment = async (
  storyId: number,
  commentId: number
): Promise<CommentResponse[]> => {
  const response = await axiosWithAuth().delete(
    `/api/story/${storyId}/comments/${commentId}`
  );
  return response.data;
};
