"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useViewport } from "@/context/viewport/ViewportContext";
import { CreatePost, Post } from "@/service/posts/PostModel";
import { PostService } from "@/service/posts/PostService";
import { formatDate } from "@/utils/formatting";
import { postSchema } from "@/utils/schema-form-rules/posts/create-post";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { IoIosCreate } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteOpenModal] = useState(false);

  const { isLargeScreen } = useViewport();

  const router = useRouter();

  const pushArticlePage = (postId: number) => {
    router.push(`/noticias/${postId}`);
  };

  const getPosts = async (): Promise<Post[]> => {
    const response = await PostService.GetPosts();
    return response;
  };

  const createPost = async (post: CreatePost): Promise<Post> => {
    try {
      const response = await PostService.CreatePost(post);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const deletePost = async (id: number): Promise<void> => {
    try {
      await PostService.DeletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      author: "",
      content: "",
      description: "",
      title: "",
    },
  });

  useEffect(() => {
    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao buscar a biblioteca do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const onSubmit = async (post: z.infer<typeof postSchema>) => {
    try {
      const newPost = await createPost(post);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao criar o post:", error);
    }
  };

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="mt-28">
        {isLoading ? (
          <Spinner show={isLoading} />
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-none container m-auto ${
              isLargeScreen ? "px-56" : ""
            }`}
          >
            {posts.map((post) => (
              <Card
                key={post.id}
                className="border-none shadow-none cursor-pointer group"
                onClick={() => pushArticlePage(post.id)}
              >
                <CardHeader>
                  <CardTitle className="transition group-hover:text-blue-500">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {post.content.length > 200
                      ? `${post.content.substring(0, 120)}...`
                      : post.content}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start text-[0.6em]">
                  <p>
                    {formatDate(post.createdAt)} por {post.author}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crie um novo post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="title" className="text-start">
                        Título <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          className="col-span-4"
                          placeholder="Digite um título"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="author" className="text-start">
                        Autor <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="author"
                          className="col-span-4"
                          placeholder="Digite um título"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="description" className="text-start">
                        Descrição <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="description"
                          className="col-span-4"
                          placeholder="Digite um título"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="content" className="text-start">
                        Conteúdo <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Digite aqui o conteúdo..."
                          {...field}
                          className="col-span-4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/*  MODAL DE EXCLUSÃO */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteOpenModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Remover post</DialogTitle>
          <ul className="grid gap-5 max-h-[450px] overflow-y-auto">
            {posts.map((post) => (
              <li
                key={post.id}
                className="border p-2 rounded-md flex justify-between items-center"
              >
                <div>
                  <h1>{post.title}</h1>
                  <p className="text-[0.8em] text-gray-600">
                    {post.description}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <TiDelete className="text-red-500 w-6 h-6 cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Você tem certeza disso?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Essa ação não terá retorno. Esse post será apagado
                        permanentemente!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500"
                        onClick={() => deletePost(post.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
      <div className="fixed bottom-[50px] right-[69px] flex flex-col items-center justify-center">
        <MdDeleteForever
          className="w-12 h-12 text-red-500 transform transition-transform duration-200 hover:scale-110 cursor-pointer ml-[-8px]"
          onClick={() => setDeleteOpenModal(true)}
        />
        <IoIosCreate
          className="w-12 h-12 transform transition-transform duration-200 hover:scale-110 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>
    </div>
  );
}
