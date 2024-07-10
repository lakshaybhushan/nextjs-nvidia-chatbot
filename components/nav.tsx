import { ModeToggle } from "./ui/theme-switcher";

export default function Nav() {
  return (
    <nav className="fixed flex w-full items-center justify-between p-6">
      <h1>nvidia + vercel ai</h1>
      <ModeToggle />
    </nav>
  );
}
