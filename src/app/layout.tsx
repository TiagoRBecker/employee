"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from '@chakra-ui/react'
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <SessionProvider>
      <body className={inter.className}>
       <ChakraProvider>
 
        {children}
        </ChakraProvider>
        </body>
        </SessionProvider>
    </html>
  );
}
