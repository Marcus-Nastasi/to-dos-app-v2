import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/contexts/alert-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - To-Dos App",
  description: "",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <AlertProvider>
            {children}
         </AlertProvider>
      </body>
    </html>
  );
}
