import { ModeToggle } from "./ui/theme-switcher";

export default function Nav() {
  return (
    <nav className="fixed flex w-full items-center justify-between p-6 bg-background md:bg-transparent">
      <h1>nvidia + vercel</h1>
      <ModeToggle />
    </nav>
  );
}
