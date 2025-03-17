import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { AppProvider } from '../context/AppProvider';

export const metadata: Metadata = {
  title: "Rnd Industry",
  description: "Login Register Next js app with Laravel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <AppProvider>
         <Toaster/>
         <Navbar/>
        {children}
      </AppProvider>
      </body>
    </html>
  );
}
