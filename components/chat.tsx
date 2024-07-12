"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { type CoreMessage } from "ai";
import { BsNvidia } from "react-icons/bs";
import ChatInput from "./chat-input";
import { readStreamableValue } from "ai/rsc";
import { FaUserAstronaut } from "react-icons/fa6";
import { IoLogoVercel } from "react-icons/io5";
import { continueConversation } from "../app/actions";
import { toast } from "sonner";
import remarkGfm from "remark-gfm";
import { MemoizedReactMarkdown } from "./markdown";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("google/gemma-2-9b-it");
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    setMessages([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim().length === 0) return;

    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: "user" },
    ];

    setMessages(newMessages);
    setInput("");

    try {
      const result = await continueConversation(newMessages, model);

      for await (const content of readStreamableValue(result)) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: content as string,
          },
        ]);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      // <div className="stretch mx-auto mt-28 flex w-full max-w-xl flex-col items-center px-8 pb-[10rem] md:px-0 md:pt-16">
      <div className="stretch mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4 pb-[8rem] md:pt-[4rem] xl:pt-[2rem] pt-[6rem] md:px-0">
        <h1 className="text-center text-5xl font-medium tracking-tighter">
          NVIDIA NIM + Vercel AI SDK Chatbot Demo
        </h1>

        <div className="mt-6 flex items-center justify-center gap-4">
          <BsNvidia className="text-nvidia mr-4 size-20" />
          <span className="text-8xl">+</span>
          <IoLogoVercel className="size-20" />
        </div>

        <div className="mt-6 px-3 md:px-0">
          <h2 className="text-base font-medium">Note:</h2>
          <ul className="ml-6 mt-2 flex list-disc flex-col items-start gap-2.5 text-sm text-primary/80">
            <li>
              Since the NVIDIA&apos;s NIM API Inference only provides{" "}
              <span className="text-nvidia font-medium">1000 credits</span> for
              free, I&apos;ve implemented a rate limiter to prevent abuse. If you
              encounter a rate limit, you can try again{" "}
              <span className="text-nvidia font-medium">after an hour</span> has
              elapsed.
            </li>
            <li>
              By testing any model, you assume the risk of any harm caused by
              any response or output of the model. Please do not upload any
              confidential information or personal data. Your use is logged for
              security.
            </li>
            <li>
              This chatbot is for demonstration purposes only and is not
              affiliated with either NVIDIA or Vercel in any way.
            </li>
            <li>
              All the logos and trademarks are the properties of their
              respective owners. I do not own any of them. This is a
              non-commercial project.
            </li>
          </ul>
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          model={model}
          handleModelChange={handleModelChange}
        />
      </div>
    );
  }

  return (
    <div className="stretch mx-auto w-full max-w-2xl px-4 py-[8rem] pt-24 md:px-0">
      {messages.map((m, i) => (
        <div key={i} className="mb-4 flex items-start p-2">
          <div
            className={cn(
              "flex size-8 shrink-0 select-none items-center justify-center rounded-lg",
              m.role === "user"
                ? "border bg-background"
                : "bg-nvidia border border-[#628f10] text-primary-foreground",
            )}>
            {m.role === "user" ? <FaUserAstronaut /> : <BsNvidia />}
          </div>
          <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
            <MemoizedReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="prose prose-sm break-words dark:prose-invert prose-code:text-wrap prose-pre:rounded-lg prose-pre:bg-zinc-900 prose-pre:p-4 prose-pre:text-zinc-100">
              {m.content as string}
            </MemoizedReactMarkdown>
          </div>
        </div>
      ))}
      <div ref={messageEndRef} />
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        model={model}
        handleModelChange={handleModelChange}
      />
    </div>
  );
}
