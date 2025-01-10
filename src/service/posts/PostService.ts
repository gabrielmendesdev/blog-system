import api from "../api";
import { Post } from "./PostModel";

export const PostService = {
  GetPosts: async (): Promise<Post[]> => {
    try {
      const response = await api.get<Post[]>("/posts");
      return response.data;
    } catch (error) {
      throw new Error(`Não foi possível encontrar os posts: ${error}`);
    }
  },
};
