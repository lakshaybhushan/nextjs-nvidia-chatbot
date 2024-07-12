import "./globals.css";
import Nav from "@/components/nav";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NVIDIA NIM Chatbot Demo",
  description: "A chatbot made demo using NVIDIA NIM and Vercel AI SDK RSC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${FigtreeFont.className} min-h-screen font-light selection:bg-[#74B202] selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Nav />
          <Toaster position={"top-center"} richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
