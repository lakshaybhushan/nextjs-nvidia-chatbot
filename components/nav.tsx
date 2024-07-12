import Link from "next/link";
import { ModeToggle } from "./ui/theme-switcher";
import { FaGithub } from "react-icons/fa6";
import { Button } from "./ui/button";

export default function Nav() {
  return (
    <nav className="fixed flex w-full items-center justify-between bg-background p-6 md:bg-transparent">
      <h1>nvidia + vercel</h1>
      <div className="flex items-center gap-4">
        <Link
          href="https://github.com/lakshaybhushan/nvidia-nim-nextjs"
          target="_blank"
          rel="noopener noreferrer">
          <Button
            variant="secondary"
            className="h-9 w-9 p-0 md:w-auto md:px-4 md:py-2">
            <FaGithub className="h-[1rem] w-[1rem] md:mr-1.5" />
            <span className="hidden md:block">GitHub</span>
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
