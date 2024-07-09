import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "@/components/nav";

const DM_SansFont = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nvidia-nim-chatbot",
  description: "a simple chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${DM_SansFont.className} min-h-screen font-light selection:bg-blue-700 selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
