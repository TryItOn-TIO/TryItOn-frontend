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
  products: ProductResponse[];
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
      contents: "첫 번째 스토리",
      likeCount: 1,
      liked: false,
      createdAt: "2024-01-01",
      products: [],
      author: {
        id: 1,
        username: "사용자1",
        profileImage: "",
      },
      comments: [
        {
          id: 1,
          username: "댓글작성자1",
          contents: "멋진 스타일이네요!",
          createdAt: "2024-01-01T10:00:00",
          position: { x: 100, y: 150 },
        },
      ],
    },
    {
      storyId: 2,
      storyImageUrl: "",
      contents: "두 번째 스토리",
      likeCount: 5,
      liked: true,
      createdAt: "2024-01-02",
      products: [],
      author: {
        id: 2,
        username: "사용자2",
        profileImage: "",
      },
      comments: [
        {
          id: 2,
          username: "댓글작성자2",
          contents: "어디서 구매하셨나요?",
          createdAt: "2024-01-02T14:30:00",
          position: { x: 200, y: 100 },
        },
      ],
    },
    {
      storyId: 3,
      storyImageUrl: "",
      contents: "세 번째 스토리",
      likeCount: 3,
      liked: false,
      createdAt: "2024-01-03",
      products: [],
      author: {
        id: 3,
        username: "사용자3",
        profileImage: "",
      },
      comments: [],
    },
  ],
  length: 3,
};
