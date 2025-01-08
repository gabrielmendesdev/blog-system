"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import HamburgerMenu from "@/components/ui/menuburguer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useViewport } from "@/context/viewport/ViewportContext";
import { cn } from "@/lib/utils";
import { Post, Posts } from "@/service/posts/PostModel";
import { PostService } from "@/service/posts/PostService";
import { formatDate } from "@/utils/formatting";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Desenvolvimento Web",
    href: "#",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    title: "Mobile Apps",
    href: "#",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    title: "Consultoria",
    href: "#",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit..",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async (): Promise<Posts> => {
    const response = await PostService.GetPosts();
    return response;
  };

  const { isLargeScreen } = useViewport();

  useEffect(() => {
    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        const postsData = await getPosts();

        // Ordenar os posts do mais recente para o mais antigo
        const sortedPosts = postsData.posts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setPosts(sortedPosts);
        console.log(sortedPosts);
      } catch (error) {
        console.error("Erro ao buscar a biblioteca do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div className="h-dvh flex flex-col">
      <header className="fixed top-0 w-full h-16 border-b-2 flex items-center justify-between bg-white z-50 m-auto p-10">
        <div>
          <Image
            src="/blog-image.png"
            alt="Icone do blog"
            width={60}
            height={60}
          />
        </div>
        {isLargeScreen ? (
          <ul className="flex gap-6">
            <li className="cursor-pointer p-3 hover:bg-gray-300 transition">
              Blog
            </li>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[300px] grid-cols-1">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <li className="cursor-pointer p-3 hover:bg-gray-300 transition">
              Sobre
            </li>
            <li className="cursor-pointer p-3 hover:bg-gray-300 transition">
              Contato
            </li>
          </ul>
        ) : (
          <HamburgerMenu />
        )}
      </header>
      <main className="mt-28">
        {isLoading ? (
          <p>Carregando posts...</p>
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
              >
                <CardHeader>
                  <CardTitle className="transition group-hover:text-blue-500">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
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
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
