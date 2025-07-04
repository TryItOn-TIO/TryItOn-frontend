import { ProductResponse } from "@/types/product";
import { CommentResponse } from "@/types/comment";

export type Author = {
  id: number;
  username: string;
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
  createdAt: string;
  proucts: ProductResponse[];
  author: Author;
  comments: CommentResponse[];
};

export type StoriesResponse = {
  stories: StoryResponse[];
  length: number;
};

export const initialStoriesData: StoriesResponse = {
  stories: [
    {
      storyId: 1,
      storyImageUrl: "",
      contents: "",
      likeCount: 1,
      liked: false,
      createdAt: "",
      proucts: [],
      author: {
        id: 1,
        username: "",
        profileImage: "",
      },
      comments: [],
    },
  ],
  length: 10,
};
