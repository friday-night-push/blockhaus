export type CommentType = { id: number; author: string; text: string };

export type TopicType = {
  id: number;
  name: string;
  text: string;
  comments?: CommentType[];
};
