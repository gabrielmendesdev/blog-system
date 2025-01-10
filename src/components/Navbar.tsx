import { ListItem } from "./ListItem";
import HamburgerMenu from "./ui/menuburguer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { useViewport } from "@/context/viewport/ViewportContext";
import Link from "next/link";
import { FaBlog } from "react-icons/fa";

export const Navbar: React.FC = (): React.ReactNode => {
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

  const { isLargeScreen } = useViewport();

  return (
    <header className="fixed top-0 w-full h-16 border-b-2 flex items-center justify-between bg-white z-50 m-auto p-10">
      <Link className="cursor-pointer" href={"/"}>
        <FaBlog className="w-12 h-12" />
      </Link>
      {isLargeScreen ? (
        <ul className="flex gap-6">
          <li className="cursor-pointer p-3 hover:bg-gray-300 transition">
            <Link href={"/"}>Blog</Link>
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
  );
};
