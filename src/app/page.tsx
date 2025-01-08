"use client";

import { Post, Posts } from "@/service/posts/PostModel";
import { PostService } from "@/service/posts/PostService";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async (): Promise<Posts> => {
    const response = await PostService.GetPosts();
    return response;
  };

  useEffect(() => {
    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        const posts = await getPosts();
        setPosts(posts.posts);
        console.log(posts);
      } catch (error) {
        console.error("Erro ao buscar a biblioteca do usuário:", error);
      } finally {
        setIsLoading(false);
        console.log(isLoading);
        console.log(posts);
      }
    };

    fetchLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-dvh">
      <header className="m-auto w-full container h-16 border-b-2 p-3 flex items-center justify-between">
        <div>
          <Image
            src="/blog-image.png"
            alt="Icone do blog"
            width={60}
            height={60}
          />
        </div>
        <ul className="flex gap-6">
          <li className="cursor-pointer p-3 hover:bg-gray-300 transition">
            Blog
          </li>
          <li className="cursor-pointer p-3 hover:bg-gray-300 transition">
            Sobre
          </li>
          <li className="cursor-pointer p-3 hover:bg-gray-300 transition">
            Contato
          </li>
          <li className="cursor-pointer p-3 hover:bg-gray-300 transition">
            Shop
          </li>
        </ul>
      </header>
    </div>
  );
}
