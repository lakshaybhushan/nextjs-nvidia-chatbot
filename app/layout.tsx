import "./globals.css";
import Nav from "@/components/nav";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js AI Chatbot — NVIDIA NIM + Vercel AI SDK",
  description:
    "An open-source AI chatbot app template built with Next.js, the Vercel AI SDK and NVIDIA NIM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta property="og:image" content="/opengraph-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="832" />
      <meta
        property="og:site_name"
        content="Next.js AI Chatbot — NVIDIA NIM + Vercel AI SDK"
      />
      <meta property="og:url" content="https://nvidia-nim.vercel.app/" />
      <meta name="twitter:image" content="/twitter-image.png" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="832" />
      <body
        className={`${FigtreeFont.className} selection:bg-nvidia min-h-screen font-light selection:text-white`}>
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
