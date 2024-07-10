"use client";

import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import ChatInput from "./chat-input";
import Markdown from "react-markdown";
import { BsNvidia } from "react-icons/bs";
import { useRef, useEffect } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";

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

  if (messages.length === 0) {
    return (
      <div className="stretch mx-auto flex w-full max-w-xl flex-col items-center py-24">
        <h1 className="text-center text-5xl font-bold tracking-tighter">
          Nvidia NIM + Vercel AI SDK Chatbot Demo
        </h1>

        <div className="mt-6 flex items-center justify-center gap-4">
          <BsNvidia className="mr-4 size-20 text-[#74B202]" />
          <span className="text-8xl">+</span>
          <IoLogoVercel className="size-20" />
        </div>

        <ChatInput
          input={input}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  }

  return (
    <div className="stretch mx-auto flex w-full max-w-xl flex-col py-24">
      {messages.map((m) => (
        <div
          key={m.id}
          className="items-strart mb-4 flex whitespace-pre-wrap p-2">
          <div
            className={cn(
              "flex size-8 shrink-0 select-none items-center justify-center rounded-lg",
              m.role === "user"
                ? "border bg-background"
                : "border border-[#628f10] bg-[#74B202] text-primary-foreground",
            )}>
            {m.role === "user" ? <FaUserAstronaut /> : <BsNvidia />}
          </div>
          <Markdown className="prose prose-sm dark:prose-invert prose-pre:bg-zinc-200 prose-pre:text-primary dark:prose-pre:bg-zinc-900 prose-pre:text-wrap prose-headings:m-0 prose-p:m-0 prose-ul:m-0 prose-blockquote:m-0 prose-ol:m-0 prose-img:m-0 ml-6">
            {m.content}
          </Markdown>
        </div>
      ))}

      <ChatInput
        input={input}
        inputRef={inputRef}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
