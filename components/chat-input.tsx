import { AiOutlineEnter } from "react-icons/ai";
import { Button } from "./ui/button";
import Textarea from "react-textarea-autosize";

export default function ChatInput({
  input,
  inputRef,
  handleInputChange,
  handleSubmit,
}: {
  input: string;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-zinc-100 to-transparent backdrop-blur-lg dark:from-black/70">
      <div className="mt-6 w-full max-w-2xl items-center px-6">
        <div className="relative flex w-full items-center">
          <Textarea
            ref={inputRef}
            name="message"
            rows={1}
            maxRows={5}
            tabIndex={0}
            placeholder="Ask me anything..."
            spellCheck={false}
            value={input}
            className="rounded-fill min-h-12 w-full resize-none rounded-[28px] border border-input bg-muted pb-1 pl-4 pr-10 pt-3 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74B202] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={handleInputChange}
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
        <p className="p-2 text-center text-xs text-zinc-400">
          This is a demo chatbot. Built by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-all duration-150 ease-linear md:hover:text-emerald-600 dark:md:hover:text-emerald-300"
            href="https://lakshb.dev">
            lakshb.dev
          </a>{" "}
        </p>
      </div>
    </form>
  );
}
