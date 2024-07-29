import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"


import Nav from "@/src/app/components/nav"
import Footer from "../components/footer";
export const metadata: Metadata = {
  title: "Colaboradoes Plhas Magazine",
  description: "Colaboradoes Plhas Magazine",
};
const inter = Inter({ subsets: ["latin"] });

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
    
      
        <Nav/>
     

       <main>{children}</main>

       <Footer/>

   
    </div>
      
  
  );
}
