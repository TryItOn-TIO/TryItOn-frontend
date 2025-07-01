import { ProductResponse } from "./product";

export type Position = {
  x: number;
  y: number;
};

export type CommentType = {
  id: number;
  username: string;
  content: string;
  position: Position;
  createAt: string;
};

export type Author = {
  id: number;
  nickname: string;
  profileImage: string;
};

export type StoryResponse = {
  id: number;
  createAt: string;
  author: Author;
  content: string;
  liked: boolean;
  likeCount: number;
  proucts: ProductResponse[];
  comments: CommentType[];
  avatarImage: string;
};

export const initialStoriesData: StoryResponse[] = [
  {
    id: 1,
    createAt: "",
    author: {
      id: 1,
      nickname: "",
      profileImage: "",
    },
    content: "",
    liked: false,
    likeCount: 0,
    proucts: [],
    comments: [],
    avatarImage: "",
  },
];
