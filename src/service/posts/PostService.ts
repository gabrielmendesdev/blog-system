import api from "../api";
import { CreatePost, Post } from "./PostModel";

export const PostService = {
  GetPosts: async (): Promise<Post[]> => {
    try {
      const response = await api.get<Post[]>("/posts");
      return response.data;
    } catch (error) {
      throw new Error(`Não foi possível encontrar os posts: ${error}`);
    }
  },

  GetPostById: async (id: number): Promise<Post> => {
    try {
      const response = await api.get<Post>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Não foi possível encontrar os posts: ${error}`);
    }
  },

  CreatePost: async (post: CreatePost): Promise<Post> => {
    try {
      // const { author, content, description, title } = post
      const response = await api.post<Post>("/posts", post);
      return response.data;
    } catch (error) {
      throw new Error(`Não foi possível encontrar os posts: ${error}`);
    }
  },

  DeletePost: async (id: number): Promise<void> => {
    try {
      await api.delete<Post>(`/posts/${id}`);
    } catch (error) {
      throw new Error(`Não foi possível encontrar os posts: ${error}`);
    }
  },
};
