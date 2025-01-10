export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
