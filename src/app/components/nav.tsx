"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const Header = () => {
  const { data: session } = useSession();
  const MenuIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
    );
  };
  return (
    <header className="w-ful  h-24 border-b-2 border-gray-200 px-3">
      <nav className="container mx-auto h-full flex items-center justify-between">
        <div className="w-[50%] md:w-[30%] px-4 justify-start  h-full flex items-center md:justify-center gap-4">
          <Link
            href={"/magazines"}
            className="w-full object-contain h-auto md:w-[30%]  flex items-center justify-center"
          >
            <Image
              width={130}
              height={50}
              src="/logo.png"
              alt="Logo"
              className="w-full h-12 md:w-26 md:h-12 "
            />
          </Link>
        </div>
        <div className="w-[50%]">
          <ul className="hidden md:flex items-center gap-4 text-lg">
            <li>
              <Link href={"/magazines/news"}>Noticías</Link>
            </li>
            <li>
              <Link href={"/magazines/library"}>Biblioteca</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-2 cursor-pointer">
          <img
          //@ts-ignore
            src={session?.user?.avatar}
            alt={session?.user?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <p>{session?.user?.name}</p>
          <button className="px-4 py- rounded-md bg-green-600 text-white" onClick={()=>signOut({callbackUrl:"/"})}>Sair</button>
        </div>
        <div className="w-[50%] flex items-center justify-end md:hidden">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<MenuIcon />}
              variant="outline"
            />
            <MenuList mt={5}>
            <MenuItem gap={2}>
           
          <p>{session?.user?.name}</p></MenuItem>
              <MenuItem><Link href={"/magazines/news"}>Noticías</Link></MenuItem>
              <MenuItem><Link href={"/magazines/library"}>
              Biblioteca
              </Link></MenuItem>
              <MenuItem onClick={()=>signOut({callbackUrl:"/"})}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
