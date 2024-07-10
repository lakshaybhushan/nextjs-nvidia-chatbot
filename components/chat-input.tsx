import { Button } from "./ui/button";
import { BsNvidia } from "react-icons/bs";
import { ChevronDown } from "lucide-react";
import Textarea from "react-textarea-autosize";
import { AiOutlineEnter } from "react-icons/ai";
import { FaMeta, FaGoogle } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ChatInputRSCProps = {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  model: string;
  handleModelChange: (model: string) => void;
};

export default function ChatInput({
  input,
  setInput,
  handleSubmit,
  model,
  handleModelChange,
}: ChatInputRSCProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-zinc-100 to-transparent backdrop-blur-lg dark:from-black/80">
      <div className="mt-4 w-full max-w-2xl items-center px-6">
        <div className="relative flex w-full flex-col items-start gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full">
                {model.charAt(0) === "l" ? (
                  <>
                    <FaMeta className="mr-1.5" />
                    {model}
                  </>
                ) : model.charAt(0) === "g" ? (
                  <>
                    <FaGoogle className="mr-1.5" />
                    {model}
                  </>
                ) : (
                  <>
                    <BsNvidia className="mr-1.5" />
                    {model}
                  </>
                )}
                <ChevronDown size={14} className="ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => handleModelChange("llama3-8b-8192")}>
                <FaMeta className="mr-1.5" /> llama3-8b-8192
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleModelChange("gemma-7b-it")}>
                <FaGoogle className="mr-1.5" /> gemma-7b-it
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleModelChange("google/gemma-2b")}>
                <FaGoogle className="mr-1.5" /> gemma-2b
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleModelChange("nvidia/llama3-chatqa-1.5-70b")}>
                <BsNvidia className="mr-1.5" /> llama3-chatqa-1.5-70b
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleModelChange("nvidia/llama3-chatqa-1.5-8b")}>
                <BsNvidia className="mr-1.5" /> llama3-chatqa-1.5-8b
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative flex w-full items-center">
            <Textarea
              name="message"
              rows={1}
              maxRows={5}
              tabIndex={0}
              placeholder="Ask me anything..."
              spellCheck={false}
              value={input}
              className="min-h-12 w-full resize-none rounded-[28px] border border-input bg-muted pb-1 pl-4 pr-10 pt-3 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74B202] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  if (input.trim().length > 0) {
                    handleSubmit(
                      e as unknown as React.FormEvent<HTMLFormElement>,
                    );
                  }
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 mr-1 -translate-y-1/2 transform"
              disabled={input.length === 0}>
              <AiOutlineEnter size={20} />
            </Button>
          </div>
        </div>
        <p className="p-2 text-center text-xs text-zinc-400">
          This is a demo chatbot. Built by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-all duration-150 ease-linear md:hover:text-emerald-600 dark:md:hover:text-emerald-300"
            href="https://lakshb.dev">
            lakshb.dev
          </a>
        </p>
      </div>
    </form>
  );
}
