import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import Banner from "@/app/components/Banner";
import NavBar from "@/app/components/NavBar";
import AuthContextWrapper from "@/app/context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OpenTable Clone",
  description: "A clone of OpenTable.com, built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-full bg-neutral-100`}>
        <main className="container mx-auto bg-white">
          <AuthContextWrapper>
            <Banner />
            <NavBar />
            {children}
          </AuthContextWrapper>
        </main>
      </body>
    </html>
  );
}
