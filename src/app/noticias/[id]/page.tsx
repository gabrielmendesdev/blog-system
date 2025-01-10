"use client";

import { Navbar } from "@/components/Navbar";
import { Post } from "@/service/posts/PostModel";
import { PostService } from "@/service/posts/PostService";
import { formatDate } from "@/utils/formatting";
import { useEffect, useState } from "react";

interface ArticleProps {
  params: { id: string };
}

export default function Article({ params }: ArticleProps) {
  const { id } = params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>();

  const getPostById = async (id: number): Promise<Post | undefined> => {
    try {
      const response = await PostService.GetPostById(id);
      return response;
    } catch (error) {
      console.error("Erro ao buscar o post:", error);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const postData = await getPostById(parseInt(id));
        setPost(postData);
      } catch (error) {
        console.error("Erro ao buscar o artigo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!post) {
    return <div>Artigo não encontrado.</div>;
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="container mt-20 m-auto flex flex-col gap-6 p-20">
        <div>
          <h1 className="font-bold text-[2em]">{post.title}</h1>
          <p className="text-gray-800">{post.description}</p>
          <p className="text-[0.8em] mt-3">
            {post.author} - {formatDate(post.createdAt)}
          </p>
        </div>
        <div>
          <p>{post.content}</p>
        </div>
      </main>
    </div>
  );
}
