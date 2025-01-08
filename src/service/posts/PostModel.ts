export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Posts {
  posts: Post[];
}
