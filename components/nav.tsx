import { ModeToggle } from "./ui/theme-switcher";

export default function Nav() {
  return (
    <nav className="top-0 flex w-full items-center justify-between rounded-t-xl border-y px-6 py-3 mb-16">
      <h1>Naval AI</h1>
      <ModeToggle />
    </nav>
  );
}
