import { ProductResponse } from "@/types/product";
import { CommentResponse } from "@/types/comment";

export type Author = {
  id: number;
  nickname: string;
  profileImage: string;
};

export type StoryRequest = {
  avatarId: number;
  storyImageUrl: string;
  contents: string;
};

export type StoryUpdate = {
  storyImageUrl: string;
  contents: string;
};

export type StoryResponse = {
  storyId: number;
  storyImageUrl: string;
  contents: string;
  likeCount: number;
  liked: boolean;
  createAt: string;
  proucts: ProductResponse[];
  author: Author;
  comments: CommentResponse[];
};

export type StoriesResponse = {
  stories: StoryResponse[];
  length: number;
};

export const initialStoriesData: StoryResponse[] = [
  {
    storyId: 1,
    storyImageUrl: "",
    contents: "",
    likeCount: 0,
    liked: false,
    createAt: "",
    proucts: [],
    author: {
      id: 1,
      nickname: "",
      profileImage: "",
    },
    comments: [],
  },
];
