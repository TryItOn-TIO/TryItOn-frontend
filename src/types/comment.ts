export type Position = {
  x: number;
  y: number;
};

export type CommentRequest = {
  contents: string;
  position: Position;
};

export type CommentResponse = {
  id: number;
  username: string;
  contents: string;
  createdAt: string;
  position: Position;
};
