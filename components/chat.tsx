"use client";

import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { BsNvidia } from "react-icons/bs";
import { AiOutlineEnter } from "react-icons/ai";
import { FaUserAstronaut } from "react-icons/fa";
import Textarea from "react-textarea-autosize";
import { Button } from "./ui/button";
import Markdown from "react-markdown";

export const chatSample = {
  messages: [
    {
      id: 1,
      role: "user",
      content: "Hello, I am a user.",
    },
    {
      id: 2,
      role: "nvidia",
      content:
        "Hello, I am Nvidia. It's nice to meet you. How can I help you today?",
    },
    {
      id: 3,
      role: "user",
      content: "I need help with my graphics card.",
    },
    {
      id: 4,
      role: "nvidia",
      content:
        "Sure, what seems to be the problem? Can you provide more details? What is the model of your graphics card? What is the issue you are experiencing? When did the issue start? Have you tried any troubleshooting steps? If so, what were the results?",
    },

    // markdown example with code block

    {
      id: 5,
      role: "user",
      content: "I am having trouble installing the drivers.",
    },
    {
      id: 6,
      role: "nvidia",
      content: `Here are some common troubleshooting steps to resolve driver installation issues:

1. Download the latest drivers from the Nvidia website.
2. Uninstall the existing drivers using the Display Driver Uninstaller (DDU) tool.
3. Reboot your computer.
4. Install the latest drivers.
5. Reboot your computer again.
- ahah

If you are still experiencing issues, please provide more details about the error messages or symptoms you are encountering
\`\`\`
Error: Unable to install drivers
Symptoms: Screen flickering, artifacts, crashes
\`\`\`

This will help us diagnose the issue and provide you with more specific guidance.`,
    },
  ],
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // const messages = chatSample.messages;
  // const input = "";
  // const handleInputChange = () => {};
  // const handleSubmit = () => {};

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="stretch mx-auto flex w-full max-w-xl flex-col py-24">
      {messages.map((m) => (
        <div
          key={m.id}
          className="items-strart mb-4 flex whitespace-pre-wrap p-2">
          <div
            className={cn(
              "flex size-8 shrink-0 select-none items-center justify-center rounded-lg border shadow",
              m.role === "user"
                ? "bg-background"
                : "bg-primary text-primary-foreground",
            )}>
            {m.role === "user" ? <FaUserAstronaut /> : <BsNvidia />}
          </div>
          <Markdown className="prose prose-sm dark:prose-invert prose-pre:bg-zinc-200 prose-pre:text-primary dark:prose-pre:bg-zinc-900 prose-pre:text-wrap prose-headings:m-0 prose-p:m-0 prose-ul:m-0 prose-blockquote:m-0 prose-ol:m-0 prose-img:m-0 ml-6">
            {m.content}
          </Markdown>
        </div>
      ))}
    
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 mb-12 w-full max-w-2xl px-6">
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
            className="rounded-fill min-h-12 w-full resize-none rounded-md border border-input bg-muted pb-1 pl-4 pr-10 pt-3 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
            disabled={input.length === 0}>
            <AiOutlineEnter size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
}
