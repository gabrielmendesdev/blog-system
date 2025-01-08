import { fakePostsData } from "./FakePostData";
import { Posts } from "./PostModel";

export const PostService = {
  GetPosts: async (): Promise<Posts> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response: Posts = {
        posts: fakePostsData,
      };

      return response;
    } catch (error) {
      throw new Error(`Não foi possível encontrar os posts: ${error}`);
    }
  },
};
